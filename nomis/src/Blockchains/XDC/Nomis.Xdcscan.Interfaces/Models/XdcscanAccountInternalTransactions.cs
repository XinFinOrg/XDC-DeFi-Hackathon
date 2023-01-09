// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanAccountInternalTransactions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan account internal transactions.
    /// </summary>
    public class XdcscanAccountInternalTransactions :
        IXdcscanTransferList<XdcscanAccountInternalTransaction>
    {
        /// <summary>
        /// Total.
        /// </summary>
        [JsonPropertyName("total")]
        public long Total { get; set; }

        /// <summary>
        /// Per page.
        /// </summary>
        [JsonPropertyName("perPage")]
        public long PerPage { get; set; }

        /// <summary>
        /// Current page.
        /// </summary>
        [JsonPropertyName("currentPage")]
        public long CurrentPage { get; set; }

        /// <summary>
        /// Pages.
        /// </summary>
        [JsonPropertyName("pages")]
        public long Pages { get; set; }

        /// <summary>
        /// Account internal transaction list.
        /// </summary>
        [JsonPropertyName("items")]
        [DataMember(EmitDefaultValue = true)]
        public List<XdcscanAccountInternalTransaction> Items { get; set; } = new();
    }
}