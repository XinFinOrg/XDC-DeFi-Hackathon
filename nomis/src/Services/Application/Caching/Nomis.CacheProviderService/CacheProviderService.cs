// ------------------------------------------------------------------------------------------------------
// <copyright file="CacheProviderService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json;

using Microsoft.Extensions.Caching.Distributed;
using Nomis.CacheProviderService.Interfaces;
using Nomis.Utils.Contracts.Services;

namespace Nomis.CacheProviderService
{
    /// <inheritdoc cref="ICacheProviderService"/>
    internal class CacheProviderService :
        ICacheProviderService,
        ISingletonService
    {
        private readonly IDistributedCache _cache;

        /// <summary>
        /// Initialize <see cref="CacheProviderService"/>.
        /// </summary>
        /// <param name="cache"><see cref="IDistributedCache"/>.</param>
        public CacheProviderService(
            IDistributedCache cache)
        {
            _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        }

        /// <inheritdoc/>
        public async Task<string?> GetFromCacheAsync(
            string key)
        {
            return await _cache.GetStringAsync(key);
        }

        /// <inheritdoc/>
        public async Task<T?> GetFromCacheAsync<T>(
            string key)
        {
            string? cachedResponse = await _cache.GetStringAsync(key);
            return cachedResponse == null
                ? default
                : JsonSerializer.Deserialize<T?>(cachedResponse, new JsonSerializerOptions()
                {
                    PropertyNameCaseInsensitive = true
                });
        }

        /// <inheritdoc/>
        public async Task SetCacheAsync(
            string key,
            string value,
            DistributedCacheEntryOptions options)
        {
            await _cache.SetStringAsync(key, value, options);
        }

        /// <inheritdoc/>
        public async Task SetCacheAsync<T>(
            string key,
            T value,
            DistributedCacheEntryOptions options)
            where T : class
        {
            string response = JsonSerializer.Serialize(value);
            await _cache.SetStringAsync(key, response, options);
        }

        /// <inheritdoc/>
        public async Task ClearCacheAsync(string key)
        {
            await _cache.RemoveAsync(key);
        }
    }
}