// ------------------------------------------------------------------------------------------------------
// <copyright file="IScoringDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using Nomis.DataAccess.Interfaces.Contexts;
using Nomis.Domain;
using Nomis.Domain.Scoring.Entities;

namespace Nomis.DataAccess.Scoring.Interfaces.Contexts
{
    /// <summary>
    /// The database context for accessing scoring-related data.
    /// </summary>
    public interface IScoringDbContext :
        IAuditableDbContext,
        IDbContextInterface
    {
        /// <summary>
        /// Collection with scoring data.
        /// </summary>
        public DbSet<ScoringData> ScoringDatas { get; set; }
    }
}