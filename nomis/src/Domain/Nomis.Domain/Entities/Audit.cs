// ------------------------------------------------------------------------------------------------------
// <copyright file="Audit.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Contracts;
using Nomis.Utils.Contracts.Common;

namespace Nomis.Domain.Entities
{
    /// <inheritdoc cref="IAudit"/>
    public class Audit :
        IAudit<Guid>,
        IEntity<Guid>
    {
        /// <summary>
        /// Initialize <see cref="Audit"/>.
        /// </summary>
        /// <param name="userId"><see cref="UserId"/>.</param>
        /// <param name="type"><see cref="Type"/>.</param>
        /// <param name="entityName"><see cref="EntityName"/>.</param>
        /// <param name="dateTime"><see cref="DateTime"/>.</param>
        /// <param name="primaryKey"><see cref="PrimaryKey"/>.</param>
        /// <param name="oldValues"><see cref="OldValues"/>.</param>
        /// <param name="newValues"><see cref="NewValues"/>.</param>
        /// <param name="affectedColumns"><see cref="AffectedColumns"/>.</param>
        public Audit(
            Guid userId,
            string type,
            string entityName,
            DateTime dateTime,
            string primaryKey,
            string? oldValues,
            string? newValues,
            string? affectedColumns)
        {
            UserId = userId;
            Type = type;
            EntityName = entityName;
            DateTime = dateTime;
            PrimaryKey = primaryKey;
            OldValues = oldValues;
            NewValues = newValues;
            AffectedColumns = affectedColumns;
        }

        /// <inheritdoc cref="IAudit{TEntityId}.Id" />
        public Guid Id { get; set; }

        /// <inheritdoc/>
        public Guid UserId { get; private set; }

        /// <inheritdoc/>
        public string Type { get; private set; }

        /// <inheritdoc/>
        public string EntityName { get; private set; }

        /// <inheritdoc/>
        public DateTime DateTime { get; private set; }

        /// <inheritdoc/>
        public string? OldValues { get; private set; }

        /// <inheritdoc/>
        public string? NewValues { get; private set; }

        /// <inheritdoc/>
        public string? AffectedColumns { get; private set; }

        /// <inheritdoc/>
        public string PrimaryKey { get; private set; }
    }
}