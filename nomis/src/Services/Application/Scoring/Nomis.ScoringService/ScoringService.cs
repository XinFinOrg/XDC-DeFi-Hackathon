// ------------------------------------------------------------------------------------------------------
// <copyright file="ScoringService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.DataAccess.Scoring.Interfaces.Contexts;
using Nomis.Domain.Scoring.Entities;
using Nomis.Domain.Scoring.Events;
using Nomis.ScoringService.Interfaces;
using Nomis.Utils.Contracts.Services;

namespace Nomis.ScoringService
{
    /// <inheritdoc cref="IScoringService"/>
    internal sealed class ScoringService :
        IScoringService,
        IScopedService
    {
        private readonly IScoringDbContext _dbContext;
        private readonly SemaphoreSlim _dbContextThrottler = new(1);

        /// <summary>
        /// Initialize <see cref="ScoringService"/>.
        /// </summary>
        /// <param name="dbContext"><see cref="IScoringDbContext"/>.</param>
        public ScoringService(
            IScoringDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        /// <inheritdoc />
        public async Task SaveScoringDataToDatabaseAsync(
            ScoringData scoringData,
            CancellationToken cancellationToken = default)
        {
            // use throttler bc of DbContext in not thread safe
            await _dbContextThrottler.WaitAsync(cancellationToken);

            scoringData
                .AddDomainEvent(new ScoringDataAddedEvent(scoringData, $"Scoring data for {scoringData.RequestAddress} wallet added."));
            _dbContext.ScoringDatas.Add(scoringData);

            var task = _dbContext.SaveChangesAsync(cancellationToken);
            _ = task.ContinueWith(
                async _ =>
                {
                    await Task.Delay(5, cancellationToken);
                    _dbContextThrottler.Release();
                }, cancellationToken);

            try
            {
                await task;
            }
            catch (HttpRequestException)
            {
                await task;
            }
        }
    }
}