// ------------------------------------------------------------------------------------------------------
// <copyright file="HideMethodsFilter.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Microsoft.OpenApi.Models;
using Nomis.Utils.Contracts.Common;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Nomis.Api.Common.Swagger.Filters
{
    /// <summary>
    /// Filter for hiding API from path in swagger documentation.
    /// </summary>
    public sealed class HideMethodsFilter :
        IDocumentFilter
    {
        private readonly IEnumerable<IAPISettings> _apiSettings;

        /// <summary>
        /// Initialize <see cref="HideMethodsFilter"/>.
        /// </summary>
        /// <param name="apiSettings">Collection of <see cref="IAPISettings"/>.</param>
        public HideMethodsFilter(
            IEnumerable<IAPISettings> apiSettings)
        {
            _apiSettings = apiSettings;
        }

        /// <inheritdoc/>
        public void Apply(
            OpenApiDocument swaggerDoc,
            DocumentFilterContext context)
        {
            HideApiFromSwaggerPage(swaggerDoc);
        }

        /// <summary>
        /// Hide API from swagger page.
        /// </summary>
        /// <param name="swaggerDoc"><see cref="OpenApiDocument"/>.</param>
        private void HideApiFromSwaggerPage(
            OpenApiDocument swaggerDoc)
        {
            foreach (var apiSetting in _apiSettings)
            {
                if (!apiSetting.APIEnabled)
                {
                    foreach (var path in swaggerDoc.Paths.Where(x =>
                                 x.Key.StartsWith($"/api/v1/{apiSetting.APIName}", StringComparison.InvariantCultureIgnoreCase)))
                    {
                        swaggerDoc.Paths.Remove(path.Key);
                    }

                    var tag = swaggerDoc.Tags.FirstOrDefault(x =>
                        x.Name.Equals(apiSetting.APIName, StringComparison.InvariantCultureIgnoreCase));
                    if (tag != null)
                    {
                        swaggerDoc.Tags.Remove(tag);
                    }
                }
            }
        }
    }
}