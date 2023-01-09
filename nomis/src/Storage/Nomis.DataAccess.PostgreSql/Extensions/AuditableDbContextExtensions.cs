// ------------------------------------------------------------------------------------------------------
// <copyright file="AuditableDbContextExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json;

using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Nomis.CurrentUserService.Interfaces;
using Nomis.DataAccess.Interfaces.Contexts;
using Nomis.DataAccess.Interfaces.Enums;
using Nomis.DataAccess.Interfaces.EventLogging;
using Nomis.DataAccess.Interfaces.Models;
using Nomis.DataAccess.PostgreSql.Models;
using Nomis.Domain.Contracts;
using Nomis.Domain.Settings;
using Nomis.Utils.Contracts.Deleting;
using Nomis.Utils.Extensions;

namespace Nomis.DataAccess.PostgreSql.Extensions
{
    /// <summary>
    /// <see cref="IAuditableDbContext"/> extension methods.
    /// </summary>
    public static class AuditableDbContextExtensions
    {
        #region SaveChangeWithAuditAndPublishEventsAsync

        /// <summary>
        /// Сохранить изменения асинхронно с аудитом и публикацией доменных событий.
        /// </summary>
        /// <typeparam name="TAuditableDbContext">Тип контекста доступа к данным аудита.</typeparam>
        /// <param name="context">Контекст доступа к данным аудита.</param>
        /// <param name="eventLogger"><see cref="IEventLogger"/>.</param>
        /// <param name="mediator"><see cref="IMediator"/>.</param>
        /// <param name="currentUserService"><see cref="ICurrentUserService"/>.</param>
        /// <param name="entitySettings"><see cref="EntitySettings"/>.</param>
        /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
        /// <returns>Returns the number of affected records in the database.</returns>
        public static async Task<int> SaveChangesWithAuditAndPublishEventsAsync<TAuditableDbContext>(
            this TAuditableDbContext context,
            IEventLogger eventLogger,
            IMediator mediator,
            ICurrentUserService currentUserService,
            IOptionsSnapshot<EntitySettings> entitySettings,
            CancellationToken cancellationToken = new())
                where TAuditableDbContext : DbContext, IAuditableDbContext
        {
            var currentUserId = currentUserService.GetUserId();
            foreach (var entry in context.ChangeTracker.Entries<IAuditableEntity>().ToList())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedOn = DateTime.UtcNow;
                        if (currentUserId != Guid.Empty)
                        {
                            entry.Entity.CreatedBy = currentUserId;
                        }

                        break;

                    case EntityState.Modified:
                        entry.Entity.LastModifiedOn = DateTime.UtcNow;
                        if (currentUserId != Guid.Empty)
                        {
                            entry.Entity.LastModifiedBy = currentUserId;
                        }

                        break;
                    case EntityState.Deleted:
                        if (entry.Entity is ISoftDelete softDeletedEntity && entitySettings.Value.SoftDeleteEnabled)
                        {
                            softDeletedEntity.SetBySoftDeleted(currentUserId);
                            entry.State = EntityState.Modified;
                        }

                        break;
                }
            }

            var auditEntries = OnBeforeSaveChanges(context, currentUserId);
            if (currentUserId == Guid.Empty)
            {
                int result = await PublishEventsAsync(context, eventLogger, mediator, auditEntries, cancellationToken);
                return await context.BaseSaveChangesAsync(cancellationToken) + result;
            }
            else
            {
                int result = await PublishEventsAsync(context, eventLogger, mediator, auditEntries, cancellationToken);
                result += await OnAfterSaveChangesAsync(context, auditEntries.Where(_ => _.HasTemporaryProperties).ToList());
                return await context.SaveChangesAsync(true, cancellationToken) + result;
            }
        }

        #endregion SaveChangeWithAuditAndPublishEventsAsync

        #region SaveChangesWithAuditAndPublishEvents

        /// <summary>
        /// Сохранить изменения асинхронно с аудитом и публикацией доменных событий.
        /// </summary>
        /// <typeparam name="TAuditableDbContext">Тип контекста доступа к данным аудита.</typeparam>
        /// <param name="context">Контекст доступа к данным аудита.</param>
        /// <param name="eventLogger"><see cref="IEventLogger"/>.</param>
        /// <param name="mediator"><see cref="IMediator"/>.</param>
        /// <param name="currentUserService"><see cref="ICurrentUserService"/>.</param>
        /// <param name="entitySettings"><see cref="EntitySettings"/>.</param>
        /// <returns>Returns the number of affected records in the database.</returns>
        public static int SaveChangesWithAuditAndPublishEvents<TAuditableDbContext>(
            this TAuditableDbContext context,
            IEventLogger eventLogger,
            IMediator mediator,
            ICurrentUserService currentUserService,
            IOptionsSnapshot<EntitySettings> entitySettings)
                where TAuditableDbContext : DbContext, IAuditableDbContext
        {
            return SaveChangesWithAuditAndPublishEventsAsync(context, eventLogger, mediator, currentUserService, entitySettings).GetAwaiter().GetResult();
        }

        #endregion SaveChangesWithAuditAndPublishEvents

        #region OnBeforeSaveChanges

        /// <summary>
        /// Получить коллекцию данных аудита перед сохранением изменений в БД.
        /// </summary>
        /// <typeparam name="TAuditableDbContext">Тип контекста доступа к данным аудита.</typeparam>
        /// <param name="context">Контекст доступа к данным аудита.</param>
        /// <param name="userId">Идентификатор пользователя, вызвавшего изменения.</param>
        /// <returns>Возвращает список данных аудита.</returns>
        private static List<IAuditEntry> OnBeforeSaveChanges<TAuditableDbContext>(
            TAuditableDbContext context,
            Guid userId)
                where TAuditableDbContext : DbContext, IAuditableDbContext
        {
            // context.ChangeTracker.DetectChanges(); - не нужен, так как автоматически запускается
            // (если не поменяли глобальный параметр), когда вызываем ChangeTracker.Entries.
            var auditEntries = new List<IAuditEntry>();
            foreach (var entry in context.ChangeTracker.Entries<IAuditableEntity>())
            {
                if (entry.State is EntityState.Detached or EntityState.Unchanged)
                {
                    continue;
                }

                var auditEntry = new AuditEntry(entry)
                {
                    UserId = userId
                };
                auditEntries.Add(auditEntry);
                foreach (var property in entry.Properties)
                {
                    if (property.IsTemporary)
                    {
                        auditEntry.TemporaryProperties.Add(property);
                        continue;
                    }

                    string propertyName = property.Metadata.Name;
                    if (property.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValues[propertyName] = property.CurrentValue;
                        continue;
                    }

                    switch (entry.State)
                    {
                        case EntityState.Detached:
                        case EntityState.Unchanged:
                            break;
                        case EntityState.Added:
                            auditEntry.AuditType = AuditType.Create;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                            break;

                        case EntityState.Deleted:
                            auditEntry.AuditType = AuditType.Delete;
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            break;

                        case EntityState.Modified:
                            if (property.IsModified && !(property.OriginalValue == null && property.CurrentValue == null) && property.OriginalValue?.Equals(property.CurrentValue) != true)
                            {
                                auditEntry.ChangedColumns.Add(propertyName);
                                auditEntry.AuditType = AuditType.Update;
                                auditEntry.OldValues[propertyName] = property.OriginalValue;
                                auditEntry.NewValues[propertyName] = property.CurrentValue;
                            }

                            break;
                    }
                }
            }

            foreach (var auditEntry in auditEntries.Where(_ => !_.HasTemporaryProperties))
            {
                context.AuditTrails.Add(auditEntry.ToAudit());
            }

            return auditEntries.ToList();
        }

        #endregion OnBeforeSaveChanges

        #region OnAfterSaveChangesAsync

        /// <summary>
        /// Сохранить коллекцию данных аудита после сохранения изменений в БД.
        /// </summary>
        /// <typeparam name="TAuditableDbContext">Тип контекста доступа к данным аудита.</typeparam>
        /// <param name="context">Контекст доступа к данным аудита.</param>
        /// <param name="auditEntries">Коллекция данных аудита.</param>
        /// <returns>Returns the number of affected records in the database.</returns>
        private static Task<int> OnAfterSaveChangesAsync<TAuditableDbContext>(
            TAuditableDbContext context,
            IReadOnlyCollection<IAuditEntry>? auditEntries)
                where TAuditableDbContext : DbContext, IAuditableDbContext
        {
            if (auditEntries == null || auditEntries.Count == 0)
            {
                return Task.FromResult(0);
            }

            foreach (var auditEntry in auditEntries)
            {
                foreach (var prop in auditEntry.TemporaryProperties)
                {
                    if (prop.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValues[prop.Metadata.Name] = prop.CurrentValue;
                    }
                    else
                    {
                        auditEntry.NewValues[prop.Metadata.Name] = prop.CurrentValue;
                    }
                }

                context.AuditTrails.Add(auditEntry.ToAudit());
            }

            return context.BaseSaveChangesAsync();
        }

        #endregion OnAfterSaveChangesAsync

        #region PublishEventsAsync

        /// <summary>
        /// Опубликовать доменные события.
        /// </summary>
        /// <typeparam name="TAuditableDbContext">Тип контекста доступа к данным аудита.</typeparam>
        /// <param name="context">Контекст доступа к данным аудита.</param>
        /// <param name="eventLogger"><see cref="IEventLogger"/>.</param>
        /// <param name="mediator"><see cref="IMediator"/>.</param>
        /// <param name="auditEntries">Список данных аудита.</param>
        /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
        /// <returns>Returns the number of affected records in the database.</returns>
        private static async Task<int> PublishEventsAsync<TAuditableDbContext>(
            TAuditableDbContext context,
            IEventLogger eventLogger,
            IMediator mediator,
            List<IAuditEntry> auditEntries,
            CancellationToken cancellationToken = new())
            where TAuditableDbContext : DbContext, IAuditableDbContext
        {
            var domainEntities = context.ChangeTracker
                .Entries<IGeneratesDomainEvents>()
                .Where(x => x.Entity.DomainEvents.Count > 0)
                .ToList();

            var domainEvents = domainEntities
                .SelectMany(x => x.Entity.DomainEvents)
                .ToList();

            domainEntities
                .ForEach(entity => entity.Entity.ClearDomainEvents());

            var tasks = domainEvents
                .Select(async (domainEvent) =>
                {
                    var relatedAuditEntries = auditEntries.Where(x => domainEvent?.RelatedEntities?.Any(t => t == x.Entry.Entity.GetType()) == true).ToList();
                    if (relatedAuditEntries.Count > 0)
                    {
                        var oldValues = relatedAuditEntries.Select(x => new
                        {
                            Entity = x.Entry.Entity.GetType().GetGenericTypeName(),
                            OldValues = x.OldValues
                        }).ToList();
                        var newValues = relatedAuditEntries.Select(x => new
                        {
                            Entity = x.Entry.Entity.GetType().GetGenericTypeName(),
                            NewValues = x.NewValues
                        }).ToList();
                        var changes = (oldValues.Count == 0 ? null : JsonSerializer.Serialize(oldValues), newValues.Count == 0 ? null : JsonSerializer.Serialize(newValues));
                        await eventLogger.SaveAsync(domainEvent, changes);
                        await mediator.Publish(domainEvent, cancellationToken);
                    }
                    else
                    {
                        await eventLogger.SaveAsync(domainEvent, (null, null));
                        await mediator.Publish(domainEvent, cancellationToken);
                    }
                });
            await Task.WhenAll(tasks);
            return await context.BaseSaveChangesAsync(cancellationToken);
        }

        #endregion PublishEventsAsync
    }
}