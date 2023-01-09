// ------------------------------------------------------------------------------------------------------
// <copyright file="DefaultController.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.AspNetCore.Mvc;

namespace Nomis.Api.Common
{
    /// <summary>
    /// Default controller for swagger redirect.
    /// </summary>
    [ApiExplorerSettings(IgnoreApi = true)]
    public sealed class DefaultController :
        ControllerBase
    {
        /// <summary>
        /// Redirect to swagger.
        /// </summary>
        [Route("/")]
        [Route("/docs")]
        [Route("/swagger")]
        public IActionResult Index()
        {
            return new RedirectResult("~/swagger");
        }
    }
}