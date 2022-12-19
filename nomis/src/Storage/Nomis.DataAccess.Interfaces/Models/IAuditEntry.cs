// ------------------------------------------------------------------------------------------------------
// <copyright file="IAuditEntry.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.EntityFrameworkCore.ChangeTracking;
using Nomis.DataAccess.Interfaces.Enums;
using Nomis.Domain.Contracts;
using Nomis.Domain.Entities;

namespace Nomis.DataAccess.Interfaces.Models
{
    /// <summary>
    /// Audit data.
    /// </summary>
    public interface IAuditEntry
    {
        /// <summary>
        /// <see cref="EntityEntry"/>.
        /// </summary>
        public EntityEntry Entry { get; }

        /// <inheritdoc cref="IAudit.UserId" />
        public Guid UserId { get; set; }

        /// <inheritdoc cref="IAudit.EntityName" />
        public string EntityName { get; }

        /// <summary>
        /// Key values.
        /// </summary>
        public Dictionary<string, object?> KeyValues { get; }

        /// <inheritdoc cref="IAudit.OldValues" />
        public Dictionary<string, object?> OldValues { get; }

        /// <inheritdoc cref="IAudit.NewValues" />
        public Dictionary<string, object?> NewValues { get; }

        /// <summary>
        /// Temporary properties.
        /// </summary>
        public List<PropertyEntry> TemporaryProperties { get; }

        /// <inheritdoc cref="Enums.AuditType" />
        public AuditType AuditType { get; set; }

        /// <summary>
        /// Changed columns in the database table.
        /// </summary>
        public List<string> ChangedColumns { get; }

        /// <summary>
        /// Has temporary properties
        /// </summary>
        public bool HasTemporaryProperties => TemporaryProperties.Count > 0;

        /// <summary>
        /// Convert to <see cref="Audit"/>.
        /// </summary>
        /// <returns>Returns <see cref="Audit"/>.</returns>
        public Audit ToAudit();
    }
}