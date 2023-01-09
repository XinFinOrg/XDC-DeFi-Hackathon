// ------------------------------------------------------------------------------------------------------
// <copyright file="ScoringDbSeeder.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Reflection;

using Microsoft.Extensions.Logging;
using Nomis.DataAccess.Scoring.Interfaces.Contexts;
using Nomis.Domain;

namespace Nomis.DataAccess.PostgreSql.Scoring.Persistence
{
    /// <summary>
    /// Scoring data database seeder.
    /// </summary>
    internal sealed class ScoringDbSeeder :
        IDatabaseSeeder
    {
        private readonly ILogger<ScoringDbSeeder> _logger;
        private readonly IScoringDbContext _context;

        /// <summary>
        /// Initialize <see cref="ScoringDbSeeder"/>.
        /// </summary>
        /// <param name="logger"><see cref="ILogger{T}"/>.</param>
        /// <param name="context"><see cref="IScoringDbContext"/>.</param>
        public ScoringDbSeeder(
            ILogger<ScoringDbSeeder> logger,
            IScoringDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        /// <summary>
        /// Path to the directory with data for seeding the database.
        /// </summary>
        private static string SeedDataPath =>
            Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? string.Empty, "Persistence", "SeedData");

        /// <inheritdoc/>
        public void Initialize()
        {
            try
            {
                // TODO - add methods for seeding

                _context.SaveChanges();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while seeding Scoring data.");
            }
        }
    }
}