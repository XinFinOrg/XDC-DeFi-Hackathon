// ------------------------------------------------------------------------------------------------------
// <copyright file="AuditType.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.DataAccess.Interfaces.Enums
{
    /// <summary>
    /// Audit type.
    /// </summary>
    public enum AuditType :
        byte
    {
        /// <summary>
        /// None.
        /// </summary>
        None = 0,

        /// <summary>
        /// Create.
        /// </summary>
        Create = 1,

        /// <summary>
        /// Update.
        /// </summary>
        Update = 2,

        /// <summary>
        /// Delete.
        /// </summary>
        Delete = 3
    }
}