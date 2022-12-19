// ------------------------------------------------------------------------------------------------------
// <copyright file="DomainValueObject.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Reflection;

using Nomis.Domain.Attributes;
using Nomis.Domain.Contracts;

namespace Nomis.Domain.Abstractions
{
    /// <summary>
    /// Domain value object.
    /// </summary>
    // https://github.com/jhewlett/ValueObject
    public abstract class DomainValueObject :
        IValueObject,
        IEquatable<DomainValueObject>
    {
        private List<PropertyInfo>? _properties;
        private List<FieldInfo>? _fields;

        /// <summary>
        /// The equality operator.
        /// </summary>
        /// <param name="obj1">left operand.</param>
        /// <param name="obj2">Right operand.</param>
        /// <returns>Returns true if the operands are equal. Otherwise - false.</returns>
        public static bool operator ==(DomainValueObject? obj1, DomainValueObject? obj2)
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
        /// <param name="obj1">left operand.</param>
        /// <param name="obj2">Right operand.</param>
        /// <returns>Returns true if the operands are not equal. Otherwise - false.</returns>
        public static bool operator !=(DomainValueObject? obj1, DomainValueObject? obj2)
        {
            return !(obj1 == obj2);
        }

        /// <inheritdoc/>
        public bool Equals(DomainValueObject? obj)
        {
            return Equals(obj as object);
        }

        /// <inheritdoc/>
        public override bool Equals(object? obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            return GetProperties().All(p => PropertiesAreEqual(obj, p))
                && GetFields().All(f => FieldsAreEqual(obj, f));
        }

        /// <inheritdoc/>
        public override int GetHashCode()
        {
            unchecked // allow overflow
            {
                int hash = 17;
                foreach (var prop in GetProperties())
                {
                    object? value = prop.GetValue(this, null);
                    hash = HashValue(hash, value);
                }

                foreach (var field in GetFields())
                {
                    object? value = field.GetValue(this);
                    hash = HashValue(hash, value);
                }

                return hash;
            }
        }

        private static int HashValue(int seed, object? value)
        {
            int currentHash = value?.GetHashCode() ?? 0;
            return (seed * 23) + currentHash;
        }

        /// <summary>
        /// Compare properties for equivalence.
        /// </summary>
        /// <param name="obj">The object to compare.</param>
        /// <param name="p"><see cref="PropertyInfo"/>.</param>
        /// <returns>Returns true if the properties are equivalent. Otherwise - false.</returns>
        private bool PropertiesAreEqual(object? obj, PropertyInfo p)
        {
            return Equals(p.GetValue(this, null), p.GetValue(obj, null));
        }

        /// <summary>
        /// Compare fields for equivalence.
        /// </summary>
        /// <param name="obj">The object to compare.</param>
        /// <param name="f"><see cref="FieldInfo"/>.</param>
        /// <returns>Returns true if the fields are equivalent. Otherwise - false.</returns>
        private bool FieldsAreEqual(object? obj, FieldInfo f)
        {
            return Equals(f.GetValue(this), f.GetValue(obj));
        }

        /// <summary>
        /// Get a collection of properties of a value object.
        /// </summary>
        /// <returns>Returns a collection of value object properties.</returns>
        private IEnumerable<PropertyInfo> GetProperties()
        {
            return _properties ??= GetType()
                .GetProperties(BindingFlags.Instance | BindingFlags.Public)
                .Where(p => p.GetCustomAttribute(typeof(IgnoreMemberAttribute)) == null)
                .ToList();
        }

        /// <summary>
        /// Get a collection of fields of a value object.
        /// </summary>
        /// <returns>Returns a collection of fields of a value object.</returns>
        private IEnumerable<FieldInfo> GetFields()
        {
            return _fields ??= GetType().GetFields(BindingFlags.Instance | BindingFlags.Public)
                .Where(p => p.GetCustomAttribute(typeof(IgnoreMemberAttribute)) == null)
                .ToList();
        }
    }
}