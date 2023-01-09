// ------------------------------------------------------------------------------------------------------
// <copyright file="Aggregate.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Contracts;

namespace Nomis.Domain.Abstractions
{
    /// <inheritdoc cref="IAggregate"/>
    public abstract class Aggregate<TEntityId> :
        DomainEntity<TEntityId>,
        IAggregate<TEntityId>
    {
        /// <summary>
        /// Initialize <see cref="Aggregate{TEntityId}"/>.
        /// </summary>
        protected Aggregate()
        {
            Version = -1;
        }

        /// <inheritdoc cref="IAggregate.Version"/>
        public int Version { get; protected set; }

        /// <inheritdoc/>
        public void IncrementVersion()
        {
            Version++;
        }

        /// <summary>
        /// Apply domain event.
        /// </summary>
        /// <param name="event"><see cref="IDomainEvent"/>.</param>
        protected abstract void Apply(IDomainEvent @event);

        /// <summary>
        /// Apply domain event to aggregate.
        /// </summary>
        /// <param name="event">The applied domain event.</param>
        protected virtual void When(IDomainEvent @event)
        {
            // empty method is needed for cases when overridden
            // there are no methods, or the event does not belong to the entity
        }
    }

    /// <inheritdoc/>
    public abstract class Aggregate :
        Aggregate<Guid>
    {
        /// <inheritdoc/>
        public override Guid GenerateNewId()
        {
            return Guid.NewGuid();
        }
    }
}