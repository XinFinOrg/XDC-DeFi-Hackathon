// ------------------------------------------------------------------------------------------------------
// <copyright file="IHasVersion.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Utils.Contracts.Properties
{
    /// <summary>
    /// Has property with name <see cref="Version"/>.
    /// </summary>
    public interface IHasVersion :
        IHasProperty
    {
        /// <summary>
        /// Version.
        /// </summary>
        int Version { get; }
    }
}