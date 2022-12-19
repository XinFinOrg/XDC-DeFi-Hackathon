// ------------------------------------------------------------------------------------------------------
// <copyright file="ISupportsSavingChanges.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.DataAccess.Interfaces.Contracts
{
    /// <summary>
    /// Supports saving changes.
    /// </summary>
    public interface ISupportsSavingChanges
    {
        /// <summary>
        /// Save changes asynchronously.
        /// </summary>
        /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
        /// <returns>Returns the number of affected records in the database.</returns>
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        /// <summary>
        /// Save changes synchronously.
        /// </summary>
        /// <returns>Returns the number of affected records in the database.</returns>
        int SaveChanges();
    }
}