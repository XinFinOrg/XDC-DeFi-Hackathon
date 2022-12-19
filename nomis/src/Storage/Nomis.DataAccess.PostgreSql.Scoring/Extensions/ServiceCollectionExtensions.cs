// ------------------------------------------------------------------------------------------------------
// <copyright file="ServiceCollectionExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Reflection;

using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.DataAccess.Interfaces.Contexts;
using Nomis.DataAccess.PostgreSql.Extensions;
using Nomis.DataAccess.PostgreSql.Scoring.Persistence;
using Nomis.DataAccess.Scoring.Interfaces.Contexts;
using Nomis.Domain;

namespace Nomis.DataAccess.PostgreSql.Scoring.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add a data store related to scoring.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddScoringPersistence(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services
                .AddMediatR(Assembly.GetExecutingAssembly())
                .AddDatabaseContext<ScoringDbContext>(configuration)
                .AddScoped<IAuditableDbContext>(provider => provider.GetRequiredService<ScoringDbContext>())
                .AddScoped<IScoringDbContext>(provider => provider.GetRequiredService<ScoringDbContext>());
            services.AddTransient<IDatabaseSeeder, ScoringDbSeeder>();

            return services;
        }
    }
}