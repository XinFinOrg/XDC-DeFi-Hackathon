// ------------------------------------------------------------------------------------------------------
// <copyright file="IDomainEvent.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Events;

namespace Nomis.Domain.Contracts
{
    /// <inheritdoc/>
    /// <typeparam name="TEntity">The domain entity type.</typeparam>
    // ReSharper disable once UnusedTypeParameter
    public interface IDomainEvent<TEntity> :
        IDomainEvent
        where TEntity : IDomainEntity
    {
    }

    /// <summary>
    /// Domain event.
    /// </summary>
    public interface IDomainEvent :
        IEvent
    {
        /// <summary>
        /// The entities associated with the event.
        /// </summary>
        /// <remarks>
        /// Used to record tracked changes in the event logs.
        /// It is necessary to store in this property the types of entities, changes in which will be reflected in the event.
        /// </remarks>
        public IEnumerable<Type> RelatedEntities { get; }

        /// <summary>
        /// The aggregate current version.
        /// </summary>
        /// <remarks>
        /// Assigned when a domain event was raised by an aggregate.
        /// </remarks>
        public int? AggregateVersion { get; }
    }
}