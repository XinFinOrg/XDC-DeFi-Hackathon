// ------------------------------------------------------------------------------------------------------
// <copyright file="IDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Data;

using Nomis.DataAccess.Interfaces.Contracts;

namespace Nomis.DataAccess.Interfaces.Contexts
{
    /// <summary>
    /// Data access database context.
    /// </summary>
    public interface IDbContext :
        ISupportsSavingChanges
    {
        /// <summary>
        /// The database connection for the current data access database context.
        /// </summary>
        IDbConnection Connection { get; }

        /// <summary>
        /// Are there any changes in the data access database context.
        /// </summary>
        bool HasChanges { get; }
    }
}