// ------------------------------------------------------------------------------------------------------
// <copyright file="DomainExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Contracts;

namespace Nomis.Domain.Extensions
{
    /// <summary>
    /// Domain-related extension methods.
    /// </summary>
    public static class DomainExtensions
    {
        /// <summary>
        /// List of domain types.
        /// </summary>
        private static readonly List<Type> DomainTypes = new()
        {
            typeof(IAggregate),
            typeof(IAuditableEntity),
            typeof(IBusinessRule),
            typeof(IDomainEntity),
            typeof(IDomainEvent),
            typeof(IDomainService),
            typeof(IValueObject)
        };

        #region Domain checks

        /// <summary>
        /// Check if the type is domain type.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being domain. Otherwise - false.</returns>
        public static bool IsDomainObject(this Type type) => DomainTypes.Any(s => s.IsAssignableFrom(type));

        /// <summary>
        /// Check if the type is <see cref="IAggregate"/>.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being <see cref="IAggregate"/>. Otherwise - false.</returns>
        public static bool IsAggregate(this Type type) => typeof(IAggregate).IsAssignableFrom(type);

        /// <summary>
        /// Check if the type is <see cref="IAuditableEntity"/>.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being <see cref="IAuditableEntity"/>. Otherwise - false.</returns>
        public static bool IsAuditableEntity(this Type type) => typeof(IAuditableEntity).IsAssignableFrom(type);

        /// <summary>
        /// Check if the type is <see cref="IBusinessRule"/>.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being <see cref="IBusinessRule"/>. Otherwise - false.</returns>
        public static bool IsBusinessRule(this Type type) => typeof(IBusinessRule).IsAssignableFrom(type);

        /// <summary>
        /// Check if the type is <see cref="IDomainEvent"/>.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being <see cref="IDomainEvent"/>. Otherwise - false.</returns>
        public static bool IsDomainEvent(this Type type) => typeof(IDomainEvent).IsAssignableFrom(type);

        /// <summary>
        /// Check if the type is <see cref="IDomainService"/>.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being <see cref="IDomainService"/>. Otherwise - false.</returns>
        public static bool IsDomainService(this Type type) => typeof(IDomainService).IsAssignableFrom(type);

        /// <summary>
        /// Check if the type is <see cref="IDomainEntity"/>.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being <see cref="IDomainEntity"/>. Otherwise - false.</returns>
        public static bool IsDomainEntity(this Type type) => typeof(IDomainEntity).IsAssignableFrom(type);

        /// <summary>
        /// Check if the type is <see cref="IValueObject"/>.
        /// </summary>
        /// <param name="type">The type being checked.</param>
        /// <returns>Returns true if the type being <see cref="IValueObject"/>. Otherwise - false.</returns>
        public static bool IsValueObject(this Type type) => typeof(IValueObject).IsAssignableFrom(type);

        #endregion Domain checks
    }
}