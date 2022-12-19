// ------------------------------------------------------------------------------------------------------
// <copyright file="ScoringConfiguration.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomis.Domain.Scoring.Entities;

namespace Nomis.DataAccess.PostgreSql.Scoring.Persistence.Configurations
{
    /// <summary>
    /// Database Model Configuration for <see cref="ScoringData"/>.
    /// </summary>
    public class ScoringConfiguration :
        IEntityTypeConfiguration<ScoringData>
    {
        /// <inheritdoc/>
        public void Configure(
            EntityTypeBuilder<ScoringData> entity)
        {
            // TODO - configure
        }
    }
}