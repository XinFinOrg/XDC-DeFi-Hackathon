// ------------------------------------------------------------------------------------------------------
// <copyright file="IWalletStats.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Blockchain.Abstractions.Stats
{
    /// <summary>
    /// Wallet stats.
    /// </summary>
    public interface IWalletStats
    {
        /// <summary>
        /// Get wallet default stats score.
        /// </summary>
        /// <returns>Returns wallet default stats score.</returns>
        public double GetScore()
        {
            return 0;
        }
    }
}