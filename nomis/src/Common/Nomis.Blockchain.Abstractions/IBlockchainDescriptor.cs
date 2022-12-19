// ------------------------------------------------------------------------------------------------------
// <copyright file="IBlockchainDescriptor.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Blockchain.Abstractions
{
    /// <summary>
    /// Blockchain descriptor.
    /// </summary>
    public interface IBlockchainDescriptor
    {
        /// <summary>
        /// Gets chain Id for blockchain.
        /// </summary>
        /// <remarks>
        /// EVM chain id or sequential number like 11111x.
        /// </remarks>
        public ulong ChainId { get; }

        /// <summary>
        /// Is the blockchain compatible with the EVM.
        /// </summary>
        // ReSharper disable once InconsistentNaming
        public bool IsEVMCompatible { get; }
    }
}