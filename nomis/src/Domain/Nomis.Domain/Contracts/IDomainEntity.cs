// ------------------------------------------------------------------------------------------------------
// <copyright file="IDomainEntity.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Common;

namespace Nomis.Domain.Contracts
{
    /// <summary>
    /// Domain entity.
    /// </summary>
    public interface IDomainEntity :
        IEntity,
        IGeneratesDomainEvents,
        ISupportsCheckingRules
    {
    }
}