// ------------------------------------------------------------------------------------------------------
// <copyright file="NomisControllerFeatureProvider.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Reflection;

using Microsoft.AspNetCore.Mvc.Controllers;
using Nomis.Utils.Contracts.Common;

namespace Nomis.Api.Common.Providers
{
    /// <summary>
    /// A provider to check if the type is a controller.
    /// </summary>
    public class NomisControllerFeatureProvider :
        ControllerFeatureProvider
    {
        private readonly IEnumerable<IAPISettings> _apiSettings;

        /// <summary>
        /// Initialize <see cref="NomisControllerFeatureProvider"/>.
        /// </summary>
        /// <param name="apiSettings">Collection of <see cref="IAPISettings"/>.</param>
        public NomisControllerFeatureProvider(
            IEnumerable<IAPISettings> apiSettings)
        {
            _apiSettings = apiSettings;
        }

        /// <inheritdoc/>
        protected override bool IsController(TypeInfo typeInfo)
        {
            if (!base.IsController(typeInfo))
            {
                return false;
            }

            var apiSettings = _apiSettings.FirstOrDefault(x => x.ControllerName == typeInfo.Name);
            return apiSettings?.APIEnabled != false;
        }
    }
}