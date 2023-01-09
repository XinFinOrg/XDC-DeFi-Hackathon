// ------------------------------------------------------------------------------------------------------
// <copyright file="IHasCreatedOn.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Utils.Contracts.Properties
{
    /// <inheritdoc cref="IHasCreatedOn{TPropertyType}"/>
    public interface IHasCreatedOn :
        IHasCreatedOn<DateTime>
    {
    }

    /// <summary>
    /// Has property with name <see cref="CreatedOn"/>.
    /// </summary>
    /// <typeparam name="TPropertyType">The property type.</typeparam>
    public interface IHasCreatedOn<TPropertyType> :
        IHasProperty
    {
        /// <summary>
        /// Creation date.
        /// </summary>
        TPropertyType CreatedOn { get; set; }
    }
}