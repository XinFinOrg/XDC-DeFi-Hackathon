// ------------------------------------------------------------------------------------------------------
// <copyright file="IServiceRegistrar.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.DependencyInjection;

namespace Nomis.Utils.Contracts.Services
{
    /// <summary>
    /// Service registrar.
    /// </summary>
    public interface IServiceRegistrar
    {
        /// <summary>
        /// Register service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public IServiceCollection RegisterService(
            IServiceCollection services);
    }
}