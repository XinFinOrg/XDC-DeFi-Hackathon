// ------------------------------------------------------------------------------------------------------
// <copyright file="ICoingeckoUsdPriceResponse.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Coingecko.Interfaces.Models
{
    /// <summary>
    /// Coingecko USD price response.
    /// </summary>
    public interface ICoingeckoUsdPriceResponse
    {
        /// <inheritdoc cref="CoingeckoUsdPriceData"/>
        public CoingeckoUsdPriceData? Data { get; set; }
    }
}