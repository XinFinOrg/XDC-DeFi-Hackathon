// ------------------------------------------------------------------------------------------------------
// <copyright file="IHasId.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Utils.Contracts.Properties
{
    /// <inheritdoc cref="IHasId{TId}"/>
    public interface IHasId :
        IHasId<Guid>
    {
    }

    /// <summary>
    /// Has property with name <see cref="Id"/>.
    /// </summary>
    /// <typeparam name="TId">The identifier type.</typeparam>
    public interface IHasId<out TId> :
        IHasProperty
    {
        /// <summary>
        /// Identifier.
        /// </summary>
        TId Id { get; }
    }
}