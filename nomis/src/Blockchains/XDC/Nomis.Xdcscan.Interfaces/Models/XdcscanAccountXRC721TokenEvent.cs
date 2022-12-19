// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanAccountXRC721TokenEvent.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan account XRC-721 token transfer event.
    /// </summary>
    // ReSharper disable once InconsistentNaming
    public class XdcscanAccountXRC721TokenEvent :
        IXdcscanAccountNftTokenEvent,
        IXdcscanTransfer
    {
        /// <summary>
        /// Id.
        /// </summary>
        [JsonPropertyName("_id")]
        public string? Id { get; set; }

        /// <summary>
        /// From.
        /// </summary>
        [JsonPropertyName("from")]
        public string? From { get; set; }

        /// <summary>
        /// To.
        /// </summary>
        [JsonPropertyName("to")]
        public string? To { get; set; }

        /// <summary>
        /// Transaction hash.
        /// </summary>
        [JsonPropertyName("transactionHash")]
        public string? TransactionHash { get; set; }

        /// <summary>
        /// Address.
        /// </summary>
        [JsonPropertyName("address")]
        public string? Address { get; set; }

        /// <summary>
        /// Block hash.
        /// </summary>
        [JsonPropertyName("blockHash")]
        public string? BlockHash { get; set; }

        /// <summary>
        /// Block number.
        /// </summary>
        [JsonPropertyName("blockNumber")]
        public long? BlockNumber { get; set; }

        /// <summary>
        /// Created at.
        /// </summary>
        [JsonPropertyName("createdAt")]
        public DateTime? CreatedAt { get; set; }

        /// <summary>
        /// Data.
        /// </summary>
        [JsonPropertyName("data")]
        public string? Data { get; set; }

        /// <summary>
        /// Timestamp.
        /// </summary>
        [JsonPropertyName("timestamp")]
        public DateTime? Timestamp { get; set; }

        /// <summary>
        /// Token id.
        /// </summary>
        [JsonPropertyName("tokenId")]
        public long TokenId { get; set; }

        /// <summary>
        /// Transaction index.
        /// </summary>
        [JsonPropertyName("transactionIndex")]
        public long TransactionIndex { get; set; }

        /// <summary>
        /// Updated at.
        /// </summary>
        [JsonPropertyName("updatedAt")]
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Symbol.
        /// </summary>
        [JsonPropertyName("symbol")]
        public string? Symbol { get; set; }

        /// <summary>
        /// Decimals.
        /// </summary>
        [JsonPropertyName("decimals")]
        public int Decimals { get; set; }

        /// <summary>
        /// Coingecko id.
        /// </summary>
        [JsonPropertyName("coingeckoID")]
        public string? CoingeckoId { get; set; }

        /// <summary>
        /// Fiat value.
        /// </summary>
        [JsonPropertyName("fiatValue")]
        public decimal FiatValue { get; set; }

        /// <summary>
        /// Block time.
        /// </summary>
        [JsonPropertyName("blockTime")]
        public DateTime? BlockTime { get; set; }
    }
}