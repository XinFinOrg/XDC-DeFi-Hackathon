// ------------------------------------------------------------------------------------------------------
// <copyright file="EventType.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Utils.Enums
{
    /// <summary>
    /// Event type.
    /// </summary>
    public enum EventType :
        byte
    {
        /// <summary>
        /// Unknown event.
        /// </summary>
        Unknown = 0,

        /// <summary>
        /// Domain event.
        /// </summary>
        Domain = 1,

        /// <summary>
        /// Application event.
        /// </summary>
        Application = 2
    }
}