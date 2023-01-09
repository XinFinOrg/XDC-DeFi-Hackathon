// ------------------------------------------------------------------------------------------------------
// <copyright file="ApplicationDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Data;

using Microsoft.EntityFrameworkCore;
using Nomis.DataAccess.Interfaces.Contexts;
using Nomis.Domain.Entities;

namespace Nomis.DataAccess.PostgreSql.Persistence
{
    /// <inheritdoc cref="IApplicationDbContext"/>
    internal sealed class ApplicationDbContext :
        DbContext,
        IApplicationDbContext
    {
        /// <summary>
        /// The default database schema.
        /// </summary>
        private const string Schema = "Application";

        /// <summary>
        /// Initialize <see cref="ApplicationDbContext"/>.
        /// </summary>
        /// <param name="options"><see cref="DbContextOptions"/>.</param>
#pragma warning disable CS8618
        public ApplicationDbContext(
#pragma warning restore CS8618
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        /// <inheritdoc/>
        public IDbConnection Connection => Database.GetDbConnection();

        /// <inheritdoc/>
        public bool HasChanges => ChangeTracker.HasChanges();

        /// <inheritdoc/>
        public DbSet<EventLog> EventLogs { get; set; }

        /// <inheritdoc/>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(Schema);
            base.OnModelCreating(modelBuilder);
        }
    }
}