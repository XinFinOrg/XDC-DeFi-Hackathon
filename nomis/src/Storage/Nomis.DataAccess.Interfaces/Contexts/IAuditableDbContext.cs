// ------------------------------------------------------------------------------------------------------
// <copyright file="IAuditableDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Nomis.Domain.Entities;

namespace Nomis.DataAccess.Interfaces.Contexts
{
    /// <summary>
    /// Audit data access database context.
    /// </summary>
    public interface IAuditableDbContext :
        IDbContext
    {
        /// <summary>
        /// <see cref="Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker"/>.
        /// </summary>
        public ChangeTracker ChangeTracker { get; }

        /// <summary>
        /// A collection of entity audit data.
        /// </summary>
        public DbSet<Audit> AuditTrails { get; set; }

        /// <summary>
        /// Save changes asynchronously with a base class method.
        /// </summary>
        /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
        /// <returns>Returns the number of affected records in the database.</returns>
        public Task<int> BaseSaveChangesAsync(CancellationToken cancellationToken = new());

        /// <summary>
        /// Save changes synchronously with a base class method.
        /// </summary>
        /// <returns>Returns the number of affected records in the database.</returns>
        public int BaseSaveChanges();
    }
}