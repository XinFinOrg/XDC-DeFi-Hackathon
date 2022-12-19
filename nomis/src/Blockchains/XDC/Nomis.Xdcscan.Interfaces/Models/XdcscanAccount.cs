// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanAccount.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan account.
    /// </summary>
    public class XdcscanAccount
    {
        /// <summary>
        /// Mined block.
        /// </summary>
        [JsonPropertyName("minedBlock")]
        public long MinedBlock { get; set; }

        /// <summary>
        /// Reward count.
        /// </summary>
        [JsonPropertyName("rewardCount")]
        public long RewardCount { get; set; }

        /// <summary>
        /// Log count.
        /// </summary>
        [JsonPropertyName("logCount")]
        public long LogCount { get; set; }

        /// <summary>
        /// Transaction count.
        /// </summary>
        [JsonPropertyName("transactionCount")]
        public long TransactionCount { get; set; }

        /// <summary>
        /// Transaction from count.
        /// </summary>
        [JsonPropertyName("transactionFromCount")]
        public long TransactionFromCount { get; set; }

        /// <summary>
        /// Transaction to count.
        /// </summary>
        [JsonPropertyName("transactionToCount")]
        public long TransactionToCount { get; set; }

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
        /// Balance.
        /// </summary>
        [JsonPropertyName("balance")]
        public string? Balance { get; set; }

        /// <summary>
        /// Balance number.
        /// </summary>
        [JsonPropertyName("balanceNumber")]
        public decimal BalanceNumber { get; set; }

        /// <summary>
        /// Code.
        /// </summary>
        [JsonPropertyName("code")]
        public string? Code { get; set; }

        /// <summary>
        /// Created at.
        /// </summary>
        [JsonPropertyName("createdAt")]
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Is token.
        /// </summary>
        [JsonPropertyName("isToken")]
        public bool IsToken { get; set; }

        /// <summary>
        /// Updated at.
        /// </summary>
        [JsonPropertyName("updatedAt")]
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// From txn.
        /// </summary>
        [JsonPropertyName("fromTxn")]
        public string? FromTxn { get; set; }

        /// <summary>
        /// Token.
        /// </summary>
        [JsonPropertyName("token")]
        public XdcscanAccountToken? Token { get; set; }

        /// <summary>
        /// Contract.
        /// </summary>
        [JsonPropertyName("contract")]
        public XdcscanAccountContract? Contract { get; set; }

        /// <summary>
        /// Has XRC-20.
        /// </summary>
        [JsonPropertyName("hasXrc20")]
        public bool HasXrc20 { get; set; }

        /// <summary>
        /// Has XRC-1155.
        /// </summary>
        [JsonPropertyName("hasNft1155")]
        public bool HasXrc1155 { get; set; }

        /// <summary>
        /// Has XRC-721.
        /// </summary>
        [JsonPropertyName("hasXrc721")]
        public bool HasXrc721 { get; set; }

        /// <summary>
        /// Account name.
        /// </summary>
        [JsonPropertyName("accountName")]
        public string? AccountName { get; set; }
    }
}