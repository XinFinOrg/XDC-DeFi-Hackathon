// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Api.Common.Extensions;
using Nomis.Api.Xdc.Settings;
using Nomis.ScoringService.Interfaces.Builder;
using Nomis.Xdcscan.Interfaces;

namespace Nomis.Api.Xdc.Extensions
{
    /// <summary>
    /// Xdc extension methods.
    /// </summary>
    public static class XdcExtensions
    {
        /// <summary>
        /// Add XDC blockchain.
        /// </summary>
        /// <typeparam name="TServiceRegistrar">The service registrar type.</typeparam>
        /// <param name="optionsBuilder"><see cref="IScoringOptionsBuilder"/>.</param>
        /// <returns>Returns <see cref="IScoringOptionsBuilder"/>.</returns>
        // ReSharper disable once InconsistentNaming
        public static IScoringOptionsBuilder WithXDCBlockchain<TServiceRegistrar>(
            this IScoringOptionsBuilder optionsBuilder)
            where TServiceRegistrar : IXdcServiceRegistrar, new()
        {
            return optionsBuilder
                .With<XdcAPISettings, TServiceRegistrar>();
        }
    }
}