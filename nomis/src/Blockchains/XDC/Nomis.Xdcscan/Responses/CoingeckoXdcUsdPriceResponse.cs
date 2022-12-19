// ------------------------------------------------------------------------------------------------------
// <copyright file="CoingeckoXdcUsdPriceResponse.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

using Nomis.Coingecko.Interfaces.Models;

namespace Nomis.Xdcscan.Responses
{
    /// <summary>
    /// Coingecko XDC USD price response.
    /// </summary>
    public class CoingeckoXdcUsdPriceResponse :
        ICoingeckoUsdPriceResponse
    {
        /// <inheritdoc cref="CoingeckoUsdPriceData"/>
        [JsonPropertyName("xdce-crowd-sale")]
        public CoingeckoUsdPriceData? Data { get; set; }
    }
}