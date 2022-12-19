// ------------------------------------------------------------------------------------------------------
// <copyright file="ApiExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.Api.Common.Providers;
using Nomis.Api.Common.Swagger.Filters;
using Nomis.ScoringService.Interfaces.Builder;
using Nomis.Utils.Contracts.Common;
using Nomis.Utils.Contracts.Services;
using Serilog;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Nomis.Api.Common.Extensions
{
    /// <summary>
    /// API extension methods.
    /// </summary>
    public static class ApiExtensions
    {
        private const string ConfigsDirectory = "Configs";

        /// <summary>
        /// Delegate to pass one of IConfigurationBuilder.AddJsonFile to <see cref="AddConfigFiles"/> method.
        /// </summary>
        private delegate IConfigurationBuilder AddConfigFileDelegate(string filename, bool optional, bool reloadOnChange);

        /// <summary>
        /// Configure scoring options.
        /// </summary>
        /// <param name="builder"><see cref="WebApplicationBuilder"/>.</param>
        /// <returns>Returns <see cref="IScoringOptionsBuilder"/>.</returns>
        public static IScoringOptionsBuilder ConfigureScoringOptions(
            this WebApplicationBuilder builder)
        {
            return IScoringOptionsBuilder.Create(builder.Services, builder.Configuration);
        }

        /// <summary>
        /// Add blockchain or service.
        /// </summary>
        /// <typeparam name="TSettings">The API settings type.</typeparam>
        /// <typeparam name="TServiceRegistrar">The service registrar type.</typeparam>
        /// <param name="optionsBuilder"><see cref="IScoringOptionsBuilder"/>.</param>
        /// <returns>Returns <see cref="IScoringOptionsBuilder"/>.</returns>
        public static IScoringOptionsBuilder With<TSettings, TServiceRegistrar>(
            this IScoringOptionsBuilder optionsBuilder)
            where TSettings : class, IAPISettings, new()
            where TServiceRegistrar : IServiceRegistrar, new()
        {
            return optionsBuilder
                .RegisterBlockchainScore<TSettings, TServiceRegistrar>(new TServiceRegistrar());
        }

        /// <summary>
        /// Add Nomis controllers.
        /// </summary>
        /// <param name="manager"><see cref="ApplicationPartManager"/>.</param>
        /// <param name="scoringOptions"><see cref="IScoringOptionsBuilder"/>.</param>
        /// <returns>Returns <see cref="ApplicationPartManager"/>.</returns>
        public static ApplicationPartManager AddNomisControllers(
            this ApplicationPartManager manager,
            ScoringOptionsBuilder scoringOptions)
        {
            manager.FeatureProviders
                .Add(new NomisControllerFeatureProvider(scoringOptions.Settings));

            return manager;
        }

        /// <summary>
        /// Add Nomis swagger filters.
        /// </summary>
        /// <param name="options"><see cref="SwaggerGenOptions"/>.</param>
        /// <param name="scoringOptions"><see cref="IScoringOptionsBuilder"/>.</param>
        /// <returns>Returns <see cref="SwaggerGenOptions"/>.</returns>
        public static SwaggerGenOptions AddNomisFilters(
            this SwaggerGenOptions options,
            ScoringOptionsBuilder scoringOptions)
        {
            options.DocumentFilter<HideMethodsFilter>(scoringOptions.Settings);

            return options;
        }

        /// <summary>
        /// Adds all config files to <see cref="IConfigurationBuilder"/> as JSON config source.
        /// </summary>
        /// <param name="builder"><see cref="IConfigurationBuilder"/>.</param>
        /// <param name="relativePath">Directory to find. Root app directory if null or empty.</param>
        /// <param name="filenamePattern">Filename pattern to search.</param>
        /// <param name="includeOnlyForCurrentEnvironment">Include only for current environment.</param>
        public static IConfigurationBuilder AddJsonFiles(
            this IConfigurationBuilder builder,
            string relativePath = ConfigsDirectory,
            string filenamePattern = "*.json",
            bool includeOnlyForCurrentEnvironment = false)
        {
            var addJsonFileDelegate = new AddConfigFileDelegate(builder.AddJsonFile);
            AddConfigFiles(relativePath, filenamePattern, addJsonFileDelegate, includeOnlyForCurrentEnvironment);
            return builder;
        }

        /// <summary>
        /// Private method with shared logic of config adding.
        /// </summary>
        /// <param name="relativePath">Directory to find. Root app directory if null or empty.</param>
        /// <param name="filenamePattern">Filename pattern to search.</param>
        /// <param name="addConfigFile">Delegate to pass one of IConfigurationBuilder.AddJsonFile.</param>
        /// <param name="includeOnlyForCurrentEnvironment">Include only for current environment.</param>
        private static void AddConfigFiles(
            string relativePath,
            string filenamePattern,
            AddConfigFileDelegate addConfigFile,
            bool includeOnlyForCurrentEnvironment = false)
        {
            var appAssembly = System.Reflection.Assembly.GetEntryAssembly();
            if (appAssembly != null)
            {
                string? appRoot = Path.GetDirectoryName(appAssembly.Location);
                if (!string.IsNullOrWhiteSpace(appRoot))
                {
                    string configsFolder = Path.Combine(appRoot, relativePath);
                    foreach (string fileName in GetAvailableFiles(configsFolder, filenamePattern, includeSubdirectories: true, includeOnlyForCurrentEnvironment))
                    {
                        addConfigFile(filename: fileName, optional: true, reloadOnChange: true);
                    }
                }
            }
        }

        /// <summary>
        /// Lists all files in directory and subdirectories.
        /// </summary>
        /// <param name="directory">Directory path to search in.</param>
        /// <param name="searchPattern">File search pattern.</param>
        /// <param name="includeSubdirectories">Include subdirectories.</param>
        /// <param name="includeOnlyForCurrentEnvironment">Include only for current environment.</param>
        /// <returns>Returns a list of file paths.</returns>
        private static IEnumerable<string> GetAvailableFiles(
            string directory,
            string searchPattern,
            bool includeSubdirectories = true,
            bool includeOnlyForCurrentEnvironment = false)
        {
            var result = new List<string>();
            string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
            try
            {
                if (includeSubdirectories)
                {
                    foreach (string subDir in Directory.GetDirectories(directory))
                    {
                        var subDirFiles = GetAvailableFiles(subDir, searchPattern, includeSubdirectories);
                        result.AddRange(subDirFiles);
                    }
                }

                string[] dirFiles = Directory.GetFiles(directory, searchPattern, SearchOption.TopDirectoryOnly);
                result.AddRange(includeOnlyForCurrentEnvironment
                    ? dirFiles.Where(x => x.Contains($".{env}."))
                    : dirFiles);
            }
            catch (UnauthorizedAccessException ex)
            {
                Log.Logger.Warning(ex, "Unauthorized access.");
            }

            return result;
        }
    }
}