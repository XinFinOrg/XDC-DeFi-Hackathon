// ------------------------------------------------------------------------------------------------------
// <copyright file="AuditableAggregate.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Contracts;
using Nomis.Utils.Contracts.Deleting;

namespace Nomis.Domain.Abstractions
{
    /// <summary>
    /// Auditable aggregate.
    /// </summary>
    /// <typeparam name="TEntityId">The identifier type of auditable entity.</typeparam>
    public abstract class AuditableAggregate<TEntityId> :
        Aggregate<TEntityId>,
        IAuditableEntity<TEntityId>,
        ISoftDelete
    {
        /// <inheritdoc/>
        public Guid CreatedBy { get; set; }

        /// <inheritdoc/>
        public DateTime CreatedOn { get; set; }

        /// <inheritdoc/>
        public Guid LastModifiedBy { get; set; }

        /// <inheritdoc/>
        public DateTime? LastModifiedOn { get; set; }

        /// <inheritdoc/>
        public DateTime? DeletedOn { get; set; }

        /// <inheritdoc/>
        public Guid? DeletedBy { get; set; }
    }

    /// <inheritdoc/>
    public abstract class AuditableAggregate :
        AuditableAggregate<Guid>
    {
        /// <inheritdoc/>
        public override Guid GenerateNewId()
        {
            return Guid.NewGuid();
        }
    }
}