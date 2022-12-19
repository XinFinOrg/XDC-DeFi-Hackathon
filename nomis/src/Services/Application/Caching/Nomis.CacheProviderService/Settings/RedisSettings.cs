// ------------------------------------------------------------------------------------------------------
// <copyright file="RedisSettings.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Common;

namespace Nomis.CacheProviderService.Settings
{
    /// <summary>
    /// Redis settings.
    /// </summary>
    public class RedisSettings :
        ISettings
    {
        /// <summary>
        /// Use Redis.
        /// </summary>
        public bool UseRedis { get; set; }

        /// <summary>
        /// Connection string.
        /// </summary>
        public string? ConnectionString { get; set; }

        /// <summary>
        /// Redis instance name.
        /// </summary>
        public string? InstanceName { get; set; }
    }
}