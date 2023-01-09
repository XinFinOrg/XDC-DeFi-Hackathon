// ------------------------------------------------------------------------------------------------------
// <copyright file="IXdcscanTransferList.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan transfer list.
    /// </summary>
    /// <typeparam name="TListItem">Xdcscan transfer.</typeparam>
    public interface IXdcscanTransferList<TListItem>
        where TListItem : IXdcscanTransfer
    {
        /// <summary>
        /// List of transfers.
        /// </summary>
        [JsonPropertyName("items")]
        [DataMember(EmitDefaultValue = true)]
        public List<TListItem> Items { get; set; }
    }
}