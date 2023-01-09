// ------------------------------------------------------------------------------------------------------
// <copyright file="CoingeckoUsdPriceData.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

namespace Nomis.Coingecko.Interfaces.Models
{
    /// <summary>
    /// Coingecko Hedera USD price data.
    /// </summary>
    public class CoingeckoUsdPriceData
    {
        /// <summary>
        /// Price in USD.
        /// </summary>
        [JsonPropertyName("usd")]
        public decimal Usd { get; set; }
    }
}