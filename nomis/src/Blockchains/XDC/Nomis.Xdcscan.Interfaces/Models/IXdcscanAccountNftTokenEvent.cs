// ------------------------------------------------------------------------------------------------------
// <copyright file="IXdcscanAccountNftTokenEvent.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan account NFT token event.
    /// </summary>
    public interface IXdcscanAccountNftTokenEvent
    {
        /// <summary>
        /// Address.
        /// </summary>
        [JsonPropertyName("address")]
        public string? Address { get; set; }

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
        /// Token identifier.
        /// </summary>
        [JsonPropertyName("TokenID")]
        public long TokenId { get; set; }
    }
}