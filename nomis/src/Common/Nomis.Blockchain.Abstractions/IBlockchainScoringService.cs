// ------------------------------------------------------------------------------------------------------
// <copyright file="IBlockchainScoringService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Wrapper;

namespace Nomis.Blockchain.Abstractions
{
    /// <summary>
    /// Blockchain scoring service.
    /// </summary>
    /// <typeparam name="TWalletScore">The wallet score type.</typeparam>
    public interface IBlockchainScoringService<TWalletScore>
        where TWalletScore : IWalletScore
    {
        /// <summary>
        /// Get blockchain wallet stats by address.
        /// </summary>
        /// <param name="address">Wallet address.</param>
        /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
        /// <returns>Returns the wallet score result.</returns>
        public Task<Result<TWalletScore>> GetWalletStatsAsync(string address, CancellationToken cancellationToken = default);
    }
}