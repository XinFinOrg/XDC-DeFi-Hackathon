// ------------------------------------------------------------------------------------------------------
// <copyright file="IDatabaseSeeder.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Domain
{
    /// <summary>
    /// Database seeder.
    /// </summary>
    public interface IDatabaseSeeder
    {
        /// <summary>
        /// Initialize filling the database with data.
        /// </summary>
        void Initialize();
    }
}