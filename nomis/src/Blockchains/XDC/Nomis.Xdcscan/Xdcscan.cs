// ------------------------------------------------------------------------------------------------------
// <copyright file="Xdcscan.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.DependencyInjection;
using Nomis.Xdcscan.Extensions;
using Nomis.Xdcscan.Interfaces;

namespace Nomis.Xdcscan
{
    /// <summary>
    /// Xdcscan service registrar.
    /// </summary>
    public sealed class Xdcscan :
        IXdcServiceRegistrar
    {
        /// <inheritdoc/>
        public IServiceCollection RegisterService(
            IServiceCollection services)
        {
            return services
                .AddXdcscanService();
        }
    }
}