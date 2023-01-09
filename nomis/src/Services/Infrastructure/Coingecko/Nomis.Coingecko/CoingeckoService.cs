// ------------------------------------------------------------------------------------------------------
// <copyright file="CoingeckoService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Net.Http.Json;

using Microsoft.Extensions.Options;
using Nomis.Coingecko.Interfaces;
using Nomis.Coingecko.Interfaces.Models;
using Nomis.Coingecko.Settings;
using Nomis.Utils.Contracts.Services;

namespace Nomis.Coingecko
{
    /// <inheritdoc cref="ICoingeckoService"/>
    internal sealed class CoingeckoService :
        ICoingeckoService,
        ISingletonService
    {
        private readonly HttpClient _client;

        public CoingeckoService(
            IOptions<CoingeckoSettings> coingeckoOptions)
        {
            _client = new()
            {
                BaseAddress = new(coingeckoOptions.Value.ApiBaseUrl ?? throw new ArgumentNullException(nameof(coingeckoOptions.Value.ApiBaseUrl)))
            };
        }

        /// <inheritdoc />
        public async Task<decimal> GetUsdBalanceAsync<TResponse>(decimal balance, string tokenId)
            where TResponse : ICoingeckoUsdPriceResponse
        {
            if (balance == default)
            {
                return 0;
            }

            var response = await _client.GetAsync($"/api/v3/simple/price?ids={tokenId}&vs_currencies=usd");
            if (!response.IsSuccessStatusCode)
            {
                return 0;
            }

            var data = await response.Content.ReadFromJsonAsync<TResponse>();
            return balance * (data?.Data?.Usd ?? 0);
        }
    }
}