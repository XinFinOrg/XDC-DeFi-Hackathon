// ------------------------------------------------------------------------------------------------------
// <copyright file="IXdcscanTransfer.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan transfer.
    /// </summary>
    public interface IXdcscanTransfer
    {
        /// <summary>
        /// Block number.
        /// </summary>
        [JsonPropertyName("blockNumber")]
        public long? BlockNumber { get; set; }
    }
}