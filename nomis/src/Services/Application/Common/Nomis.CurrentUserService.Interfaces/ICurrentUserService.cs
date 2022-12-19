// ------------------------------------------------------------------------------------------------------
// <copyright file="ICurrentUserService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.AspNetCore.Http;
using Nomis.Utils.Contracts.Services;

namespace Nomis.CurrentUserService.Interfaces
{
    /// <summary>
    /// Service for working with the current user.
    /// </summary>
    public interface ICurrentUserService :
        IApplicationService
    {
        /// <summary>
        /// Get the user identifier.
        /// </summary>
        /// <returns>Returns the user identifier.</returns>
        public Guid GetUserId();

        /// <summary>
        /// Get the <see cref="HttpContext"/>.
        /// </summary>
        /// <returns>Returns <see cref="HttpContext"/>.</returns>
        public HttpContext GetHttpContext();
    }
}