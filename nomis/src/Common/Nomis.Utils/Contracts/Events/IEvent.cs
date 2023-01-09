// ------------------------------------------------------------------------------------------------------
// <copyright file="IEvent.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using MediatR;
using Nomis.Utils.Contracts.Common;
using Nomis.Utils.Enums;

namespace Nomis.Utils.Contracts.Events
{
    /// <summary>
    /// Event.
    /// </summary>
    public interface IEvent :
        IMessage,
        INotification
    {
        /// <summary>
        /// Event description.
        /// </summary>
        public string EventDescription { get; }

        /// <summary>
        /// Event type.
        /// </summary>
        public EventType EventType { get; }
    }
}