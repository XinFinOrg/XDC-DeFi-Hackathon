// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanAccountHolderTokens.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan account holder tokens.
    /// </summary>
    public class XdcscanAccountHolderTokens
    {
        /// <summary>
        /// Total.
        /// </summary>
        [JsonPropertyName("total")]
        public long Total { get; set; }
    }
}