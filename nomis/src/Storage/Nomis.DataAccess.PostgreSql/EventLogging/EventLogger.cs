// ------------------------------------------------------------------------------------------------------
// <copyright file="EventLogger.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json;

using Nomis.CurrentUserService.Interfaces;
using Nomis.DataAccess.Interfaces.Contexts;
using Nomis.DataAccess.Interfaces.EventLogging;
using Nomis.Domain.Entities;
using Nomis.Utils.Contracts.Events;

namespace Nomis.DataAccess.PostgreSql.EventLogging
{
    /// <inheritdoc cref="IEventLogger"/>.
    internal class EventLogger :
        IEventLogger
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly ILoggableDbContext _context;

        /// <summary>
        /// Initialize <see cref="EventLogger"/>.
        /// </summary>
        /// <param name="currentUserService"><see cref="ICurrentUserService"/>.</param>
        /// <param name="context"><see cref="ILoggableDbContext"/>.</param>
        public EventLogger(
            ICurrentUserService currentUserService,
            ILoggableDbContext context)
        {
            _currentUserService = currentUserService;
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<int> SaveAsync<TEvent>(TEvent @event, (string? oldValues, string? newValues) changes)
            where TEvent : IEvent
        {
            if (@event is EventLog eventLog)
            {
                _context.EventLogs.Add(eventLog);
                return await _context.SaveChangesAsync();
            }
            else
            {
                string serializedData = JsonSerializer.Serialize(@event, @event.GetType());

                var userId = _currentUserService.GetUserId();
                var thisEvent = new EventLog(
                    @event,
                    serializedData,
                    changes,
                    userId);
                _context.EventLogs.Add(thisEvent);
                return await _context.SaveChangesAsync();
            }
        }
    }
}