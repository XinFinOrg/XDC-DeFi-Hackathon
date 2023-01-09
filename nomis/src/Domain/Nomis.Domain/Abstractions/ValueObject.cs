// ------------------------------------------------------------------------------------------------------
// <copyright file="ValueObject.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Contracts;
using Nomis.Domain.Exceptions;

namespace Nomis.Domain.Abstractions
{
    /// <inheritdoc cref="ValueObject{TValueObject}"/>
    /// <typeparam name="TValueObject">The value object type.</typeparam>
    /// <typeparam name="TValue">The value object value type.</typeparam>
    public abstract class ValueObject<TValueObject, TValue> :
        ValueObject<TValueObject>,
        IValueObject<TValueObject, TValue>
            where TValueObject : class, IValueObject<TValueObject, TValue>
    {
        /// <summary>
        /// Initialize <see cref="ValueObject{TValueObject, TValue}"/>.
        /// </summary>
#pragma warning disable CS8618
        protected ValueObject()
#pragma warning restore CS8618
        {
            // overload so ValueObjects can be used as EF properties
        }

        /// <summary>
        /// Initialize <see cref="ValueObject{TValueObject, TValue}"/>.
        /// </summary>
        /// <param name="value">Value.</param>
        protected ValueObject(TValue value)
        {
            Value = value;
        }

        /// <inheritdoc cref="IValueObject{TValueObject, TValue}.Value"/>
        public TValue Value { get; }

        /// <inheritdoc/>
        public override string? ToString()
        {
            return Value?.ToString();
        }

        /// <inheritdoc/>
        protected override int GetHashCodeCore()
        {
            return Value?.GetHashCode() ?? 0;
        }

        /// <inheritdoc/>
        protected override bool EqualsCore(TValueObject? other)
        {
            if (Value == null && other == null)
            {
                return true;
            }

            return other != null && Value?.Equals(other.Value) == true;
        }
    }

    /// <inheritdoc cref="IValueObject"/>
    /// <typeparam name="TValueObject">The value object type.</typeparam>
    public abstract class ValueObject<TValueObject> :
        IValueObject<TValueObject>
            where TValueObject : class, IValueObject<TValueObject>
    {
        private int? _cachedHashCode;

        /// <summary>
        /// The equality operator.
        /// </summary>
        /// <param name="obj1">Left operand.</param>
        /// <param name="obj2">Right operand.</param>
        /// <returns>Returns true if the operands are equal. Otherwise - false.</returns>
        public static bool operator ==(ValueObject<TValueObject>? obj1, ValueObject<TValueObject>? obj2)
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
        /// The inequality operator.
        /// </summary>
        /// <param name="obj1">Left operand.</param>
        /// <param name="obj2">Right operand.</param>
        /// <returns>Returns true if the operands are not equal. Otherwise - false.</returns>
        public static bool operator !=(ValueObject<TValueObject> obj1, ValueObject<TValueObject> obj2)
        {
            return !(obj1 == obj2);
        }

        /// <inheritdoc/>
        public bool Equals(TValueObject? other)
        {
            return EqualsCore(other);
        }

        /// <inheritdoc/>
        public override bool Equals(object? obj)
        {
            if (obj is not TValueObject valueObject || GetUnproxiedType(this) != GetUnproxiedType(obj))
            {
                return false;
            }

            return EqualsCore(valueObject);
        }

        /// <inheritdoc/>
        public override int GetHashCode()
        {
            // ReSharper disable once NonReadonlyMemberInGetHashCode
            return _cachedHashCode ??= GetHashCodeCore();
        }

        /// <inheritdoc cref="Equals(TValueObject)"/>
        protected abstract bool EqualsCore(TValueObject? other);

        /// <summary>
        /// <see cref="GetHashCode"/>.
        /// </summary>
        protected abstract int GetHashCodeCore();

        /// <summary>
        /// Check business rule.
        /// </summary>
        /// <param name="rule">Business rule.</param>
        protected void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken())
            {
                throw new BusinessRuleValidationException(rule);
            }
        }

        private static Type? GetUnproxiedType(object obj)
        {
            const string efCoreProxyNamespace = "Castle.Proxies";

            var type = obj.GetType();
            if (type.Namespace?.Equals(efCoreProxyNamespace) == true)
            {
                return type.BaseType;
            }

            return type;
        }
    }
}