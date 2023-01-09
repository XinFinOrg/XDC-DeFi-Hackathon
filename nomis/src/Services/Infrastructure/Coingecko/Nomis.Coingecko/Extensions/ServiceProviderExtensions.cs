// ------------------------------------------------------------------------------------------------------
// <copyright file="ServiceProviderExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Coingecko.Extensions
{
    /// <summary>
    /// <see cref="IServiceProvider"/> extension methods.
    /// </summary>
    public static class ServiceProviderExtensions
    {
        /// <summary>
        /// Verify <see cref="CoingeckoService"/> is registered.
        /// </summary>
        /// <param name="provider"><see cref="IServiceProvider"/>.</param>
        /// <returns>Returns <see cref="IServiceProvider"/>.</returns>
        public static IServiceProvider VerifyCoingeckoServiceIsRegistered(
            this IServiceProvider provider)
        {
            if (provider.GetService(typeof(CoingeckoService)) == null)
            {
                throw new InvalidOperationException(
                    $"Unable to find {nameof(CoingeckoService)} service in registered services. You should use {nameof(ServiceCollectionExtensions.AddUSDConverter)} in ConfigureServices(...)");
            }

            return provider;
        }
    }
}