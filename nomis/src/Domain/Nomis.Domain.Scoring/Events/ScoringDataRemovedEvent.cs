// ------------------------------------------------------------------------------------------------------
// <copyright file="ScoringDataRemovedEvent.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

using Nomis.Domain.Abstractions;
using Nomis.Domain.Scoring.Entities;
using Nomis.Utils.Contracts.Common;

namespace Nomis.Domain.Scoring.Events
{
    /// <summary>
    /// Remove scoring data domain event.
    /// </summary>
    public class ScoringDataRemovedEvent :
        DomainEvent<ScoringData>
    {
        /// <summary>
        /// Initialize <see cref="ScoringDataRemovedEvent"/>.
        /// </summary>
        public ScoringDataRemovedEvent()
            : base(Guid.Empty, string.Empty, null)
        {
        }

        /// <summary>
        /// Initialize <see cref="ScoringDataRemovedEvent"/>.
        /// </summary>
        /// <param name="id">Scoring data identifier.</param>
        /// <param name="version">Aggregate current version.</param>
        /// <param name="eventDescription">Event description.</param>
        public ScoringDataRemovedEvent(
            Guid id,
            int? version,
            string eventDescription)
            : base(
                id,
                eventDescription,
                version)
        {
            Id = id;
        }

        /// <inheritdoc cref="IEntity{TEntityId}.Id"/>
        [JsonInclude]
        public Guid Id { get; private set; }
    }
}