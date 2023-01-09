// ------------------------------------------------------------------------------------------------------
// <copyright file="ICoingeckoService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Coingecko.Interfaces.Models;
using Nomis.Utils.Contracts.Services;

namespace Nomis.Coingecko.Interfaces
{
    /// <summary>
    /// Coingecko service.
    /// </summary>
    public interface ICoingeckoService :
        IInfrastructureService
    {
        /// <summary>
        /// Get USD balance oh the token.
        /// </summary>
        /// <param name="balance">The token balance in native currency.</param>
        /// <param name="tokenId">The token id.</param>
        /// <returns>Returns USD balance oh the token.</returns>
        public Task<decimal> GetUsdBalanceAsync<TResponse>(decimal balance, string tokenId)
            where TResponse : ICoingeckoUsdPriceResponse;
    }
}