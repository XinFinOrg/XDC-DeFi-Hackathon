// ------------------------------------------------------------------------------------------------------
// <copyright file="DomainEntity.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

using Nomis.Domain.Contracts;
using Nomis.Utils.Contracts.Common;

// ReSharper disable SuspiciousTypeConversion.Global

namespace Nomis.Domain.Abstractions
{
    /// <inheritdoc cref="IDomainEntity"/>
    /// <typeparam name="TEntityId">The entity identifier type.</typeparam>
    // https://github.com/vkhorikov/DddAndEFCore/blob/master/src/App/Entity.cs
    public abstract class DomainEntity<TEntityId> :
        IEntity<TEntityId>,
        IDomainEntity
    {
        /// <summary>
        /// Initialize <see cref="DomainEntity{TEntityId}"/>.
        /// </summary>
        /// <remarks>
        /// The <see cref="Id"/> property is initialized with the new GUID value.
        /// </remarks>
        protected DomainEntity()
        {
            // ReSharper disable once VirtualMemberCallInConstructor
            Id = GenerateNewId();
        }

        /// <inheritdoc cref="IEntity{TEntityId}.Id"/>
        public TEntityId Id { get; private set; }

        /// <summary>
        /// Method for generating a new entity identifier.
        /// </summary>
        /// <returns>Returns the new entity identifier.</returns>
        public abstract TEntityId GenerateNewId();

        private readonly List<IDomainEvent> _domainEvents = new();

        /// <inheritdoc/>
        [JsonIgnore]
        public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

        /// <summary>
        /// The equality operator.
        /// </summary>
        /// <param name="obj1">Left operand.</param>
        /// <param name="obj2">Right operand.</param>
        /// <returns>Returns true if the operands are equal. Otherwise - false.</returns>
        public static bool operator ==(DomainEntity<TEntityId>? obj1, DomainEntity<TEntityId>? obj2)
        {
            if (obj1 is null && obj2 is null)
            {
                return true;
            }

            if (obj1 is null || obj2 is null)
            {
                return false;
            }

            return obj1.Equals(obj2);
        }

        /// <summary>
        /// Оператор неравенства.
        /// </summary>
        /// <param name="obj1">Левый операнд.</param>
        /// <param name="obj2">Правый операнд.</param>
        /// <returns>Возвращает true, если операнды не равны. Иначе - false.</returns>
        public static bool operator !=(DomainEntity<TEntityId> obj1, DomainEntity<TEntityId> obj2) => !(obj1 == obj2);

        /// <inheritdoc/>
        public void AddDomainEvent(IDomainEvent domainEvent)
        {
            if (this is IVersionableByEvent and IAggregate aggregate)
            {
                aggregate.IncrementVersion();
            }

            _domainEvents.Add(domainEvent);
        }

        /// <inheritdoc/>
        public void RemoveDomainEvent(IDomainEvent domainEvent) => _domainEvents.Remove(domainEvent);

        /// <inheritdoc/>
        public void ClearDomainEvents() => _domainEvents.Clear();

        /// <inheritdoc/>
        public override bool Equals(object? obj)
        {
            if (obj is not DomainEntity<TEntityId> other)
            {
                return false;
            }

            if (ReferenceEquals(this, other))
            {
                return true;
            }

            if (GetRealType() != other.GetRealType())
            {
                return false;
            }

            if (Id?.Equals(default) == true || other.Id?.Equals(default) == true)
            {
                return false;
            }

            return Id?.Equals(other.Id) == true;
        }

        // ReSharper disable once NonReadonlyMemberInGetHashCode

        /// <inheritdoc/>
        public override int GetHashCode() => (GetRealType().ToString() + Id).GetHashCode();

        /// <inheritdoc/>
        public virtual void CheckRule(IBusinessRule rule) => (this as IDomainEntity).CheckRule(rule);

        private Type GetRealType() => GetType();
    }
}