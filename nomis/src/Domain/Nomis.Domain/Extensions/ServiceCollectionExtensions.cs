// ------------------------------------------------------------------------------------------------------
// <copyright file="ServiceCollectionExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.DependencyInjection;
using Nomis.Domain.Contracts;
using Nomis.Utils.Contracts.Services;

namespace Nomis.Domain.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add transient domain service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddTransientDomainService<TService, TImplementation>(this IServiceCollection services)
            where TService : IDomainService
            where TImplementation : TService, ITransientService
        {
            return services
                .AddTransient(typeof(TService), typeof(TImplementation));
        }

        /// <summary>
        /// Add scoped domain service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddScopedDomainService<TService, TImplementation>(this IServiceCollection services)
            where TService : IDomainService
            where TImplementation : TService, IScopedService
        {
            return services
                .AddScoped(typeof(TService), typeof(TImplementation));
        }

        /// <summary>
        /// Add singleton domain service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddSingletonDomainService<TService, TImplementation>(this IServiceCollection services)
            where TService : IDomainService
            where TImplementation : TService, ISingletonService
        {
            return services
                .AddSingleton(typeof(TService), typeof(TImplementation));
        }
    }
}