// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanAccountToken.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

// ReSharper disable InconsistentNaming

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan account token data.
    /// </summary>
    public class XdcscanAccountToken
    {
        /// <summary>
        /// Circulating supply.
        /// </summary>
        [JsonPropertyName("circulatingSupply")]
        public string? CirculatingSupply { get; set; }

        /// <summary>
        /// Circulating supply number.
        /// </summary>
        [JsonPropertyName("circulatingSupplyNumber")]
        public decimal CirculatingSupplyNumber { get; set; }

        /// <summary>
        /// Transaction count.
        /// </summary>
        [JsonPropertyName("txCount")]
        public long TxCount { get; set; }

        /// <summary>
        /// Holder count.
        /// </summary>
        [JsonPropertyName("holderCount")]
        public long HolderCount { get; set; }

        /// <summary>
        /// Coingecko id.
        /// </summary>
        [JsonPropertyName("coingeckoID")]
        public string? CoingeckoId { get; set; }

        /// <summary>
        /// Price USD.
        /// </summary>
        [JsonPropertyName("priceUSD")]
        public decimal PriceUSD { get; set; }

        /// <summary>
        /// Status.
        /// </summary>
        [JsonPropertyName("status")]
        public bool Status { get; set; }

        /// <summary>
        /// Id.
        /// </summary>
        [JsonPropertyName("_id")]
        public string? Id { get; set; }

        /// <summary>
        /// Hash.
        /// </summary>
        [JsonPropertyName("hash")]
        public string? Hash { get; set; }

        /// <summary>
        /// Created at.
        /// </summary>
        [JsonPropertyName("createdAt")]
        public DateTime? CreatedAt { get; set; }

        /// <summary>
        /// Updated at.
        /// </summary>
        [JsonPropertyName("updatedAt")]
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Decimals.
        /// </summary>
        [JsonPropertyName("decimals")]
        public int Decimals { get; set; }

        /// <summary>
        /// Is mintable.
        /// </summary>
        [JsonPropertyName("isMintable")]
        public bool IsMintable { get; set; }

        /// <summary>
        /// Name.
        /// </summary>
        [JsonPropertyName("name")]
        public string? Name { get; set; }

        /// <summary>
        /// Symbol.
        /// </summary>
        [JsonPropertyName("symbol")]
        public string? Symbol { get; set; }

        /// <summary>
        /// Total supply.
        /// </summary>
        [JsonPropertyName("totalSupply")]
        public string? TotalSupply { get; set; }

        /// <summary>
        /// Total supply number.
        /// </summary>
        [JsonPropertyName("totalSupplyNumber")]
        public decimal TotalSupplyNumber { get; set; }

        /// <summary>
        /// Type.
        /// </summary>
        [JsonPropertyName("type")]
        public string? Type { get; set; }
    }
}