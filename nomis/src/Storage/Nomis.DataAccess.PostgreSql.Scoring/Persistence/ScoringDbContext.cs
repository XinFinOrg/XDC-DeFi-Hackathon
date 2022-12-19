// ------------------------------------------------------------------------------------------------------
// <copyright file="ScoringDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Nomis.CurrentUserService.Interfaces;
using Nomis.DataAccess.Interfaces.EventLogging;
using Nomis.DataAccess.PostgreSql.Persistence.Abstractions;
using Nomis.DataAccess.PostgreSql.Scoring.Constants;
using Nomis.DataAccess.PostgreSql.Scoring.Extensions;
using Nomis.DataAccess.Scoring.Interfaces.Contexts;
using Nomis.Domain.Scoring.Entities;
using Nomis.Domain.Settings;

namespace Nomis.DataAccess.PostgreSql.Scoring.Persistence
{
    /// <inheritdoc cref="IScoringDbContext"/>
    internal sealed class ScoringDbContext :
        AuditableDbContext,
        IScoringDbContext
    {
        /// <summary>
        /// Initialize <see cref="ScoringDbContext"/>.
        /// </summary>
        /// <param name="options"><see cref="DbContextOptions"/>.</param>
        /// <param name="eventLogger"><see cref="IEventLogger"/>.</param>
        /// <param name="currentUserService"><see cref="ICurrentUserService"/>.</param>
        /// <param name="mediator"><see cref="IMediator"/>.</param>
        /// <param name="entitySettings"><see cref="EntitySettings"/>.</param>
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ScoringDbContext(
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
            DbContextOptions<ScoringDbContext> options,
            IEventLogger eventLogger,
            ICurrentUserService currentUserService,
            IMediator mediator,
            IOptionsSnapshot<EntitySettings> entitySettings)
                : base(options, eventLogger, currentUserService, mediator, entitySettings)
        {
        }

        /// <inheritdoc/>
        public DbSet<ScoringData> ScoringDatas { get; set; }

        /// <inheritdoc/>
        protected override string Schema => nameof(PostgreSqlConstants.Schemes.Scoring);

        /// <inheritdoc/>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasDefaultSchema(Schema);
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(GetType().Assembly);
            builder.ApplyScoringConfiguration();
        }
    }
}