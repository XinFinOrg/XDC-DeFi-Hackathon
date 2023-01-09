// ------------------------------------------------------------------------------------------------------
// <copyright file="ICacheProviderService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.Caching.Distributed;
using Nomis.Utils.Contracts.Services;

namespace Nomis.CacheProviderService.Interfaces
{
    /// <summary>
    /// Service for working with cache.
    /// </summary>
    public interface ICacheProviderService :
        IApplicationService
    {
        /// <summary>
        /// Get value from cache.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns>Returns value from cache.</returns>
        public Task<string?> GetFromCacheAsync(
            string key);

        /// <summary>
        /// Get value from cache.
        /// </summary>
        /// <typeparam name="T">The type of returned value.</typeparam>
        /// <param name="key">The key.</param>
        /// <returns>Returns value from cache.</returns>
        public Task<T?> GetFromCacheAsync<T>(
            string key);

        /// <summary>
        /// Store data in cache.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        /// <param name="options"><see cref="DistributedCacheEntryOptions"/>.</param>
        public Task SetCacheAsync(
            string key,
            string value,
            DistributedCacheEntryOptions options);

        /// <summary>
        /// Store data in cache.
        /// </summary>
        /// <typeparam name="T">The type of stored value.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        /// <param name="options"><see cref="DistributedCacheEntryOptions"/>.</param>
        public Task SetCacheAsync<T>(
            string key,
            T value,
            DistributedCacheEntryOptions options)
            where T : class;

        /// <summary>
        /// Clear the cache for the given key.
        /// </summary>
        /// <param name="key">The key.</param>
        Task ClearCacheAsync(
            string key);
    }
}