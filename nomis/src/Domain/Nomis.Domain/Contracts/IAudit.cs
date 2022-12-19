// ------------------------------------------------------------------------------------------------------
// <copyright file="IAudit.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Domain.Contracts
{
    /// <inheritdoc cref="IAudit"/>
    /// <typeparam name="TEntityId">The database record identifier type.</typeparam>
    public interface IAudit<TEntityId> : IAudit
    {
        /// <summary>
        /// Database record identifier.
        /// </summary>
        public TEntityId Id { get; set; }
    }

    /// <summary>
    /// Entity audit data.
    /// </summary>
    public interface IAudit
    {
        /// <summary>
        /// The identifier of the user who caused the change.
        /// </summary>
        public Guid UserId { get; }

        /// <summary>
        /// Change type.
        /// </summary>
        public string Type { get; }

        /// <summary>
        /// The name of the entity in which the change occurred.
        /// </summary>
        public string EntityName { get; }

        /// <summary>
        /// The date the changes occurred.
        /// </summary>
        public DateTime DateTime { get; }

        /// <summary>
        /// Old values.
        /// </summary>
        public string? OldValues { get; }

        /// <summary>
        /// New values.
        /// </summary>
        public string? NewValues { get; }

        /// <summary>
        /// Affected columns in the database table.
        /// </summary>
        public string? AffectedColumns { get; }

        /// <summary>
        /// The primary key of a database table.
        /// </summary>
        public string PrimaryKey { get; }
    }
}