// ------------------------------------------------------------------------------------------------------
// <copyright file="IAuditableEntity.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Common;
using Nomis.Utils.Contracts.Properties;

namespace Nomis.Domain.Contracts
{
    /// <inheritdoc cref="IAuditableEntity"/>
    /// <typeparam name="TEntityId">The identifier type.</typeparam>
    public interface IAuditableEntity<out TEntityId> :
        IAuditableEntity,
        IEntity<TEntityId>
    {
    }

    /// <summary>
    /// Auditable entity.
    /// </summary>
    public interface IAuditableEntity :
        IEntity,
        IHasCreatedOn,
        IHasLastModifiedOn
    {
        /// <summary>
        /// The identifier of the user who created the entity.
        /// </summary>
        Guid CreatedBy { get; set; }

        /// <summary>
        /// The identifier of the user who last modified the entity.
        /// </summary>
        Guid LastModifiedBy { get; set; }
    }
}