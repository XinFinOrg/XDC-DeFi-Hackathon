// ------------------------------------------------------------------------------------------------------
// <copyright file="CoingeckoSettings.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Common;

namespace Nomis.Coingecko.Settings
{
    /// <summary>
    /// Coingecko settings.
    /// </summary>
    internal class CoingeckoSettings :
        ISettings
    {
        /// <summary>
        /// API base URL.
        /// </summary>
        /// <remarks>
        /// <see href="https://www.coingecko.com/en/api/documentation"/>
        /// </remarks>
        public string? ApiBaseUrl { get; set; }
    }
}