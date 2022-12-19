// ------------------------------------------------------------------------------------------------------
// <copyright file="EventLog.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

using Nomis.Domain.Abstractions;
using Nomis.Domain.Contracts;
using Nomis.Utils.Contracts.Common;
using Nomis.Utils.Contracts.Events;

namespace Nomis.Domain.Entities
{
    /// <summary>
    /// Domain event log.
    /// </summary>
    public class EventLog :
        DomainEvent,
        IEntity<Guid>
    {
        /// <summary>
        /// Initialize <see cref="EventLog"/>.
        /// </summary>
        /// <remarks>
        /// The Id property is initialized with the new <see cref="Guid"/> value.
        /// </remarks>
        /// <param name="event">Event.</param>
        /// <param name="data">Event log data.</param>
        /// <param name="changes">Event changes.</param>
        /// <param name="userId">The ID of the user who triggered the event.</param>
        public EventLog(IEvent @event, string data, (string? oldValues, string? newValues) changes, Guid userId)
            : base(@event.AggregateId, @event.EventDescription, (@event as IDomainEvent)?.AggregateVersion)
        {
            Id = Guid.NewGuid();
            Data = data;
            (string? oldValues, string? newValues) = changes;
            OldValues = oldValues;
            NewValues = newValues;
            UserId = userId;

            // ReSharper disable once VirtualMemberCallInConstructor
            SetMessageType(@event.MessageType);
        }

        /// <summary>
        /// Initialize <see cref="DomainEvent"/>.
        /// </summary>
#pragma warning disable CS8618
        public EventLog()
#pragma warning restore CS8618
            : base(Guid.Empty, string.Empty, null)
        {
        }

        /// <inheritdoc cref="IAudit{TEntityId}.Id" />
        [JsonInclude]
        public Guid Id { get; private set; }

        /// <summary>
        /// Event log data.
        /// </summary>
        /// <remarks>
        /// Usually stored as a serialized json string.
        /// </remarks>
        [JsonInclude]
        public string Data { get; private set; }

        /// <inheritdoc cref="IAudit.OldValues" />
        [JsonInclude]
        public string? OldValues { get; private set; }

        /// <inheritdoc cref="IAudit.NewValues" />
        [JsonInclude]
        public string? NewValues { get; private set; }

        /// <inheritdoc cref="IAudit.UserId" />
        [JsonInclude]
        public Guid UserId { get; private set; }
    }
}