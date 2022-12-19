// ------------------------------------------------------------------------------------------------------
// <copyright file="DomainEvent.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

using Nomis.Domain.Contracts;
using Nomis.Utils.Abstractions.Common;
using Nomis.Utils.Contracts.Events;
using Nomis.Utils.Enums;
using Nomis.Utils.Extensions;

namespace Nomis.Domain.Abstractions
{
    /// <inheritdoc cref="IDomainEvent"/>
    /// <typeparam name="TEntity">The domain event entity type.</typeparam>
    // ReSharper disable once UnusedTypeParameter
    public abstract class DomainEvent<TEntity> :
        DomainEvent, IDomainEvent<TEntity>
            where TEntity : IDomainEntity
    {
        /// <summary>
        /// Initialize <see cref="DomainEvent"/>.
        /// </summary>
        /// <param name="aggregateId">Aggregate identifier.</param>
        /// <param name="eventDescription">Event description.</param>
        /// <param name="aggregateVersion">Aggregate current version.</param>
        /// <param name="additionRelatedEntities">Event additional related entities.</param>
        protected DomainEvent(
            Guid aggregateId,
            string eventDescription,
            int? aggregateVersion,
            params Type[] additionRelatedEntities)
            : base(aggregateId, eventDescription, aggregateVersion, additionRelatedEntities.Union(new[] { typeof(TEntity) }).ToArray())
        {
        }
    }

    /// <inheritdoc cref="IDomainEvent"/>
    public abstract class DomainEvent :
        Message,
        IDomainEvent
    {
        /// <summary>
        /// Initialize <see cref="DomainEvent"/>.
        /// </summary>
        /// <param name="aggregateId">Aggregate identifier.</param>
        /// <param name="eventDescription">Event description.</param>
        /// <param name="aggregateVersion">Aggregate current version.</param>
        /// <param name="relatedEntities">Event related entities.</param>
        protected DomainEvent(
            Guid aggregateId,
            string eventDescription,
            int? aggregateVersion,
            params Type[] relatedEntities)
            : base(aggregateId)
        {
            EventDescription = eventDescription;
            AggregateVersion = aggregateVersion;
            Timestamp = DateTime.UtcNow;
            EventType = EventType.Domain;
            RelatedEntities = relatedEntities;

            // ReSharper disable once VirtualMemberCallInConstructor
            SetMessageType();
        }

        /// <inheritdoc cref="IDomainEvent.RelatedEntities"/>
        [NotMapped]
        [JsonIgnore]
        public IEnumerable<Type> RelatedEntities { get; private set; }

        /// <inheritdoc cref="IDomainEvent.AggregateVersion"/>
        [JsonInclude]
        public int? AggregateVersion { get; private set; }

        /// <inheritdoc cref="IEvent.EventDescription"/>
        [JsonInclude]
        public string EventDescription { get; private set; }

        /// <summary>
        /// The date the event occurred.
        /// </summary>
        [JsonInclude]
        public DateTime Timestamp { get; private set; }

        /// <inheritdoc cref="IEvent.EventType"/>
        [JsonInclude]
        public EventType EventType { get; private set; }

        /// <inheritdoc/>
        protected override void SetMessageType(string? messageType = null)
        {
            base.SetMessageType(messageType ?? GetType().GetGenericTypeName());
        }
    }
}