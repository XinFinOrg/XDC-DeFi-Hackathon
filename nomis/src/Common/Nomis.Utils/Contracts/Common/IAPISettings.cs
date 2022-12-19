// ------------------------------------------------------------------------------------------------------
// <copyright file="IAPISettings.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

// ReSharper disable InconsistentNaming

namespace Nomis.Utils.Contracts.Common
{
    /// <summary>
    /// API settings.
    /// </summary>
    public interface IAPISettings :
        ISettings
    {
        /// <summary>
        /// API is enabled.
        /// </summary>
        public bool APIEnabled { get; set; }

        /// <summary>
        /// API name.
        /// </summary>
        public string APIName { get; }

        /// <summary>
        /// API controller name.
        /// </summary>
        public string ControllerName { get; }
    }
}