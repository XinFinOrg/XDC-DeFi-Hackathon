// ------------------------------------------------------------------------------------------------------
// <copyright file="IPaginated.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Utils.Contracts.Common
{
    /// <summary>
    /// Paginated.
    /// </summary>
    public interface IPaginated
    {
        /// <summary>
        /// Current page number.
        /// </summary>
        public int PageNumber { get; }

        /// <summary>
        /// Count of data per page.
        /// </summary>
        public int PageSize { get; }
    }
}