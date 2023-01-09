// ------------------------------------------------------------------------------------------------------
// <copyright file="AuditEntry.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json;

using Microsoft.EntityFrameworkCore.ChangeTracking;
using Nomis.DataAccess.Interfaces.Enums;
using Nomis.DataAccess.Interfaces.Models;
using Nomis.Domain.Entities;
using Nomis.Utils.Extensions;

namespace Nomis.DataAccess.PostgreSql.Models
{
    /// <inheritdoc cref="IAuditEntry"/>
    internal class AuditEntry :
        IAuditEntry
    {
        /// <summary>
        /// Initialize <see cref="AuditEntry"/>.
        /// </summary>
        /// <param name="entry"><see cref="EntityEntry"/>.</param>
        public AuditEntry(EntityEntry entry)
        {
            Entry = entry;
            EntityName = entry.Entity.GetType().GetGenericTypeName();
        }

        /// <inheritdoc/>
        public EntityEntry Entry { get; }

        /// <inheritdoc/>
        public Guid UserId { get; set; }

        /// <inheritdoc/>
        public string EntityName { get; }

        /// <inheritdoc/>
        public Dictionary<string, object?> KeyValues { get; } = new();

        /// <inheritdoc/>
        public Dictionary<string, object?> OldValues { get; } = new();

        /// <inheritdoc/>
        public Dictionary<string, object?> NewValues { get; } = new();

        /// <inheritdoc/>
        public List<PropertyEntry> TemporaryProperties { get; } = new();

        /// <inheritdoc/>
        public AuditType AuditType { get; set; }

        /// <inheritdoc/>
        public List<string> ChangedColumns { get; } = new();

        /// <inheritdoc/>
        public bool HasTemporaryProperties => TemporaryProperties.Count > 0;

        /// <inheritdoc/>
        public Audit ToAudit()
        {
            return new(
                UserId,
                AuditType.ToString(),
                Entry.Entity.GetType().GetGenericTypeName(),
                DateTime.UtcNow,
                JsonSerializer.Serialize(KeyValues),
                OldValues.Count == 0 ? null : JsonSerializer.Serialize(OldValues),
                NewValues.Count == 0 ? null : JsonSerializer.Serialize(NewValues),
                ChangedColumns.Count == 0 ? null : JsonSerializer.Serialize(ChangedColumns));
        }
    }
}