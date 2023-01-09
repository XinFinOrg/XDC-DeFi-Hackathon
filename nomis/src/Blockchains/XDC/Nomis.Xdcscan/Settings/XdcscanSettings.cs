// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanSettings.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Common;

namespace Nomis.Xdcscan.Settings
{
    /// <summary>
    /// Xdcscan settings.
    /// </summary>
    internal class XdcscanSettings :
        ISettings
    {
        /// <summary>
        /// API base URL.
        /// </summary>
        /// <remarks>
        /// <see href="https://xdc.blocksscan.io/docs"/>
        /// </remarks>
        public string? ApiBaseUrl { get; set; }
    }
}