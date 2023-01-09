// ------------------------------------------------------------------------------------------------------
// <copyright file="ServiceCollectionExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.CacheProviderService.Interfaces;
using Nomis.CacheProviderService.Settings;
using Nomis.Utils.Extensions;

namespace Nomis.CacheProviderService.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add cache.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddCache(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services
                .AddMemoryCache()
                .AddDistributedMemoryCache();

            services
                .AddSettings<RedisSettings>(configuration);
            var redisSettings = configuration.GetSettings<RedisSettings>();
            if (redisSettings.UseRedis)
            {
                services.AddStackExchangeRedisCache(options =>
                {
                    options.Configuration = redisSettings.ConnectionString;
                    options.InstanceName = redisSettings.InstanceName;
                    options.ConfigurationOptions = new()
                    {
                        AbortOnConnectFail = false,
                        EndPoints =
                        {
                            redisSettings.ConnectionString
                        }
                    };
                });
            }

            return services
                .AddCacheProviderService();
        }

        /// <summary>
        /// Add a service for working with cache.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        private static IServiceCollection AddCacheProviderService(
            this IServiceCollection services)
        {
            return services
                .AddSingletonApplicationService<ICacheProviderService, CacheProviderService>();
        }
    }
}