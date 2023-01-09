// ------------------------------------------------------------------------------------------------------
// <copyright file="IAggregateRoot.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Domain.Contracts
{
    /// <inheritdoc cref="IAggregateRoot"/>
    /// <typeparam name="TAggregateRootId">Aggregate root identifier type.</typeparam>
    public interface IAggregateRoot<out TAggregateRootId> :
        IAggregate<TAggregateRootId>
    {
    }

    /// <summary>
    /// Aggregate root.
    /// </summary>
    public interface IAggregateRoot
        : IAggregate
    {
    }
}