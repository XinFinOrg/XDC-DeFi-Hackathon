// ------------------------------------------------------------------------------------------------------
// <copyright file="IHasStatusCode.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Utils.Contracts.Properties
{
    /// <inheritdoc cref="IHasStatusCode{TPropertyType}"/>
    public interface IHasStatusCode :
        IHasStatusCode<int>
    {
    }

    /// <summary>
    /// Has property with name <see cref="StatusCode"/>.
    /// </summary>
    /// <typeparam name="TPropertyType">Property type.</typeparam>
    public interface IHasStatusCode<TPropertyType> :
        IHasProperty
    {
        /// <summary>
        /// HTTP status code.
        /// </summary>
        TPropertyType StatusCode { get; set; }
    }
}