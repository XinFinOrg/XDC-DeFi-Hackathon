// ------------------------------------------------------------------------------------------------------
// <copyright file="IVersionableByEvent.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Domain.Contracts
{
    /// <inheritdoc cref="IVersionableByEvent"/>
    /// <typeparam name="TAggregateId">The aggregate identifier type.</typeparam>
    /// <typeparam name="TAggregate">The aggregate type.</typeparam>
    /// <typeparam name="TEvent">The event type.</typeparam>
    public interface IVersionableByEvent<TAggregateId, out TAggregate, in TEvent> :
        IVersionableByEvent
        where TAggregate : class, IAggregate<TAggregateId>, IVersionableByEvent<TAggregateId, TAggregate, TEvent>
        where TEvent : class, IDomainEvent, new()
    {
        /// <summary>
        /// Apply a domain event to an aggregate.
        /// </summary>
        /// <param name="event">Domain event.</param>
        public void When(TEvent @event);
    }

    /// <summary>
    /// An aggregate that is versioned depending on the domain event.
    /// </summary>
    public interface IVersionableByEvent
    {
    }
}