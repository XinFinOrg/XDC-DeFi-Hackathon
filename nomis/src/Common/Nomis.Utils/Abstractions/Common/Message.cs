// ------------------------------------------------------------------------------------------------------
// <copyright file="Message.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

using Nomis.Utils.Contracts.Common;
using Nomis.Utils.Extensions;

namespace Nomis.Utils.Abstractions.Common
{
    /// <summary>
    /// Message.
    /// </summary>
    public abstract class Message :
        IMessage
    {
        /// <summary>
        /// Initialize <see cref="Message"/>.
        /// </summary>
        /// <remarks>
        /// The <see cref="MessageType"/> property is initialized with the type name of the class that inherits this class.
        /// </remarks>
        /// <param name="aggregateId">Aggregate identifier.</param>
        /// <param name="messageType">Message type.</param>
        protected Message(
            Guid aggregateId,
            string? messageType = null)
        {
            MessageType = messageType ?? GetType().GetGenericTypeName();
            AggregateId = aggregateId == Guid.Empty ? Guid.NewGuid() : aggregateId;
        }

        /// <inheritdoc cref="IMessage.MessageType"/>
        [JsonInclude]
        public string MessageType { get; private set; }

        /// <inheritdoc cref="IMessage.AggregateId"/>
        [JsonInclude]
        public Guid AggregateId { get; private set; }

        /// <summary>
        /// Set the message type.
        /// </summary>
        /// <param name="messageType">Message type.</param>
        protected virtual void SetMessageType(string? messageType = null)
        {
            MessageType = messageType ?? GetType().GetGenericTypeName();
        }
    }
}