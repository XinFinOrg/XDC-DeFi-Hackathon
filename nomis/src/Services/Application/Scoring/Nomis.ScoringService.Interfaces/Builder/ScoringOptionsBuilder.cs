// ------------------------------------------------------------------------------------------------------
// <copyright file="ScoringOptionsBuilder.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.Utils.Contracts.Common;
using Nomis.Utils.Contracts.Services;
using Nomis.Utils.Extensions;

namespace Nomis.ScoringService.Interfaces.Builder
{
    /// <inheritdoc cref="IScoringOptionsBuilder"/>
    public sealed class ScoringOptionsBuilder :
        IScoringOptionsBuilder
    {
        private readonly IServiceCollection _services;
        private readonly IConfiguration _configuration;
        private readonly List<IAPISettings> _settings = new();
        private readonly List<IServiceRegistrar> _registrars = new();

        /// <summary>
        /// Initialize <see cref="ScoringOptionsBuilder"/>.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        internal ScoringOptionsBuilder(
            IServiceCollection services,
            IConfiguration configuration)
        {
            _services = services;
            _configuration = configuration;
        }

        /// <inheritdoc />
        public IEnumerable<IAPISettings> Settings => _settings;

        /// <inheritdoc />
        public IScoringOptionsBuilder RegisterBlockchainScore<TSettings, TServiceRegistrar>(
            IServiceRegistrar registrar)
            where TSettings : class, IAPISettings, new()
            where TServiceRegistrar : IServiceRegistrar
        {
            _settings.Add(_configuration.GetSettings<TSettings>());
            _registrars.Add(registrar);

            return this;
        }

        /// <inheritdoc />
        public ScoringOptionsBuilder Build()
        {
            _registrars.ForEach(_ => _.RegisterService(_services));
            return this;
        }
    }
}