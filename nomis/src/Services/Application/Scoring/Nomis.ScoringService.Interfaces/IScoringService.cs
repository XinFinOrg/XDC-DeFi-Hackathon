// ------------------------------------------------------------------------------------------------------
// <copyright file="IScoringService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Scoring.Entities;
using Nomis.Utils.Contracts.Services;

namespace Nomis.ScoringService.Interfaces
{
    /// <summary>
    /// Scoring service.
    /// </summary>
    public interface IScoringService :
        IApplicationService
    {
        /// <summary>
        /// Save scoring data to database.
        /// </summary>
        /// <param name="scoringData">Wallet scoring data.</param>
        /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
        public Task SaveScoringDataToDatabaseAsync(
            ScoringData scoringData,
            CancellationToken cancellationToken = default);
    }
}