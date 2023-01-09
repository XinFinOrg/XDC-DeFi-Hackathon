// ------------------------------------------------------------------------------------------------------
// <copyright file="IMessage.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Utils.Contracts.Common
{
    /// <summary>
    /// Message.
    /// </summary>
    public interface IMessage
    {
        /// <summary>
        /// Message type.
        /// </summary>
        string MessageType { get; }

        /// <summary>
        /// Aggregate identifier.
        /// </summary>
        Guid AggregateId { get; }
    }
}