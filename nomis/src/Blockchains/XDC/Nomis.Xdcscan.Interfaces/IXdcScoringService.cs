// ------------------------------------------------------------------------------------------------------
// <copyright file="IXdcScoringService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Blockchain.Abstractions;
using Nomis.Utils.Contracts.Services;
using Nomis.Xdcscan.Interfaces.Models;

namespace Nomis.Xdcscan.Interfaces
{
    /// <summary>
    /// Xdc scoring service.
    /// </summary>
    public interface IXdcScoringService :
        IBlockchainScoringService<XdcWalletScore>,
        IBlockchainDescriptor,
        IInfrastructureService
    {
    }
}