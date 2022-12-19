// ------------------------------------------------------------------------------------------------------
// <copyright file="SerilogExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Security.Principal;

using Humanizer;
using Serilog;

namespace Nomis.Web.Server.Common.Extensions
{
    /// <summary>
    /// Serilog extension methods.
    /// </summary>
    public static class SerilogExtensions
    {
        /// <summary>
        /// HTTP request enricher.
        /// </summary>
        /// <param name="diagnosticContext"><see cref="IDiagnosticContext"/>.</param>
        /// <param name="httpContext"><see cref="HttpContext"/>.</param>
        internal static void HttpRequestEnricher(
            IDiagnosticContext diagnosticContext,
            HttpContext httpContext)
        {
            var httpContextInfo = new
            {
                Protocol = httpContext.Request.Protocol,
                Scheme = httpContext.Request.Scheme,
                IpAddress = httpContext.Connection.RemoteIpAddress?.ToString(),
                Host = httpContext.Request.Host.ToString(),
                User = GetUserInfo(httpContext.User),
                Headers = httpContext.Request.Headers,
                Cookies = httpContext.Request.Cookies
            };

            diagnosticContext.Set(nameof(httpContext).Pascalize(), httpContextInfo, true);
        }

        private static string GetUserInfo(IPrincipal user)
        {
            if (user.Identity is { IsAuthenticated: true })
            {
                return user.Identity.Name ?? Environment.UserName;
            }

            return Environment.UserName;
        }
    }
}