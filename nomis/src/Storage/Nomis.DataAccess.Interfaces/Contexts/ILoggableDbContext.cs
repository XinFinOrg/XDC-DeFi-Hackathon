// ------------------------------------------------------------------------------------------------------
// <copyright file="ILoggableDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using Nomis.Domain.Entities;

namespace Nomis.DataAccess.Interfaces.Contexts
{
    /// <summary>
    /// Database context of access to logged data.
    /// </summary>
    public interface ILoggableDbContext :
        IDbContext
    {
        /// <summary>
        /// Collection of domain event logs.
        /// </summary>
        public DbSet<EventLog> EventLogs { get; set; }
    }
}