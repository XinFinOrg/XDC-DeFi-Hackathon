// ------------------------------------------------------------------------------------------------------
// <copyright file="AuditableDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Data;

using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Nomis.CurrentUserService.Interfaces;
using Nomis.DataAccess.Interfaces.Contexts;
using Nomis.DataAccess.Interfaces.Contracts;
using Nomis.DataAccess.Interfaces.EventLogging;
using Nomis.DataAccess.PostgreSql.Extensions;
using Nomis.Domain.Abstractions;
using Nomis.Domain.Entities;
using Nomis.Domain.Settings;

namespace Nomis.DataAccess.PostgreSql.Persistence.Abstractions
{
    /// <inheritdoc cref="IAuditableDbContext"/>
    public abstract class AuditableDbContext :
        DbContext,
        IAuditableDbContext
    {
        private readonly IEventLogger _eventLogger;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMediator _mediator;
        private readonly IOptionsSnapshot<EntitySettings> _entitySettings;

        /// <summary>
        /// Initialize <see cref="AuditableDbContext"/>.
        /// </summary>
        /// <param name="options"><see cref="DbContextOptions"/>.</param>
        /// <param name="eventLogger"><see cref="IEventLogger"/>.</param>
        /// <param name="currentUserService"><see cref="ICurrentUserService"/>.</param>
        /// <param name="mediator"><see cref="IMediator"/>.</param>
        /// <param name="entitySettings"><see cref="EntitySettings"/>.</param>
#pragma warning disable CS8618
        protected AuditableDbContext(
#pragma warning restore CS8618
            DbContextOptions options,
            IEventLogger eventLogger,
            ICurrentUserService currentUserService,
            IMediator mediator,
            IOptionsSnapshot<EntitySettings> entitySettings)
            : base(options)
        {
            _eventLogger = eventLogger ?? throw new ArgumentNullException(nameof(eventLogger));
            _currentUserService = currentUserService ?? throw new ArgumentNullException(nameof(currentUserService));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _entitySettings = entitySettings ?? throw new ArgumentNullException(nameof(entitySettings));
        }

        /// <inheritdoc/>
        public IDbConnection Connection => Database.GetDbConnection();

        /// <inheritdoc/>
        public bool HasChanges => ChangeTracker.HasChanges();

        /// <inheritdoc/>
        public DbSet<Audit> AuditTrails { get; set; }

        /// <summary>
        /// Схема БД, используемая по умолчанию.
        /// </summary>
        protected abstract string Schema { get; }

        /// <inheritdoc/>
        public virtual async Task<int> BaseSaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

        /// <inheritdoc/>
        public virtual int BaseSaveChanges()
        {
            return base.SaveChanges();
        }

        /// <inheritdoc cref="IAuditableDbContext"/>
        public new virtual async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await this.SaveChangesWithAuditAndPublishEventsAsync(_eventLogger, _mediator, _currentUserService, _entitySettings, cancellationToken);
        }

        /// <inheritdoc cref="ISupportsSavingChanges.SaveChanges"/>
        public override int SaveChanges()
        {
            return this.SaveChangesWithAuditAndPublishEvents(_eventLogger, _mediator, _currentUserService, _entitySettings);
        }

        /// <inheritdoc/>
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            return SaveChanges();
        }

        /// <inheritdoc/>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (!string.IsNullOrWhiteSpace(Schema))
            {
                modelBuilder.HasDefaultSchema(Schema);
            }

            modelBuilder.Ignore<DomainEvent>();
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        }
    }
}