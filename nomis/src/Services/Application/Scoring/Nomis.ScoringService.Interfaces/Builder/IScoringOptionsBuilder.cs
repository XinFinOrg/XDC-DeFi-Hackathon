// ------------------------------------------------------------------------------------------------------
// <copyright file="IScoringOptionsBuilder.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.Utils.Contracts.Common;
using Nomis.Utils.Contracts.Services;

namespace Nomis.ScoringService.Interfaces.Builder
{
    /// <summary>
    /// Scoring options builder.
    /// </summary>
    public interface IScoringOptionsBuilder
    {
        /// <summary>
        /// Collection of API settings.
        /// </summary>
        public IEnumerable<IAPISettings> Settings { get; }

        /// <summary>
        /// Create the builder instance.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        public static IScoringOptionsBuilder Create(
            IServiceCollection services,
            IConfiguration configuration)
        {
            return new ScoringOptionsBuilder(services, configuration);
        }

        /// <summary>
        /// Register the blockchain score.
        /// </summary>
        /// <typeparam name="TSettings">The API settings type.</typeparam>
        /// <typeparam name="TServiceRegistrar">The blockchain service registrar type.</typeparam>
        /// <param name="registrar"><see cref="IServiceRegistrar"/>.</param>
        // ReSharper disable once UnusedTypeParameter
        public IScoringOptionsBuilder RegisterBlockchainScore<TSettings, TServiceRegistrar>(
            IServiceRegistrar registrar)
            where TSettings : class, IAPISettings, new()
            where TServiceRegistrar : IServiceRegistrar;

        /// <summary>
        /// Build scoring options.
        /// </summary>
        /// <returns>Returns <see cref="ScoringOptionsBuilder"/>.</returns>
        public ScoringOptionsBuilder Build();
    }
}