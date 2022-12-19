// ------------------------------------------------------------------------------------------------------
// <copyright file="ServiceCollectionExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.DataAccess.Interfaces.Contexts;
using Nomis.DataAccess.Interfaces.EventLogging;
using Nomis.DataAccess.PostgreSql.EventLogging;
using Nomis.DataAccess.PostgreSql.Persistence;
using Nomis.Utils.Extensions;
using Serilog;

namespace Nomis.DataAccess.PostgreSql.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        #region AddApplicationPersistence

        /// <summary>
        /// Add a data storage associated with the application.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddApplicationPersistence(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            return services
                .AddDatabaseContext<ApplicationDbContext>(configuration)
                .AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>())
                .AddScoped<ILoggableDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>())
                .AddScoped<IEventLogger, EventLogger>();
        }

        #endregion AddApplicationPersistence

        #region AddDatabaseContext

        /// <summary>
        /// Add a database data access context.
        /// </summary>
        /// <typeparam name="TDbContext">The type of data access context.</typeparam>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddDatabaseContext<TDbContext>(
            this IServiceCollection services,
            IConfiguration configuration)
            where TDbContext : DbContext
        {
            return services.AddPostgreSql<TDbContext>(configuration);
        }

        #endregion AddDatabaseContext

        #region AddPostgreSql

        /// <summary>
        /// Add data access context to PostgreSql.
        /// </summary>
        /// <typeparam name="TDbContext">The type of data access context.</typeparam>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        private static IServiceCollection AddPostgreSql<TDbContext>(
            this IServiceCollection services,
            IConfiguration configuration)
            where TDbContext : DbContext
        {
            services.AddDbContext<TDbContext>(m => m.UseNpgsql(configuration.GetConnectionString("NomisDb"), e => e.MigrationsAssembly(typeof(TDbContext).Assembly.FullName)));
            using var scope = services.BuildServiceProvider().CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<TDbContext>();
            dbContext.Database.Migrate();
            Log.Logger.Information("{DbContext} automatic migration complete.", typeof(TDbContext).GetGenericTypeName());

            return services;
        }

        #endregion AddPostgreSql
    }
}