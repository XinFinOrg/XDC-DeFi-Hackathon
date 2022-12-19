// ------------------------------------------------------------------------------------------------------
// <copyright file="IWalletTokenStats.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Blockchain.Abstractions.Stats
{
    /// <summary>
    /// Wallet token stats.
    /// </summary>
    public interface IWalletTokenStats :
        IWalletStats
    {
        private const double TokensHoldingPercents = 3.86 / 100;

        /// <summary>
        /// Value of all holding tokens (number).
        /// </summary>
        public int TokensHolding { get; set; }

        /// <summary>
        /// Get wallet token stats score.
        /// </summary>
        /// <returns>Returns wallet token stats score.</returns>
        public new double GetScore()
        {
            return TokensHoldingScore(TokensHolding) / 100 * TokensHoldingPercents;
        }

        private static double TokensHoldingScore(int tokens)
        {
            return tokens switch
            {
                < 1 => 3.52,
                < 5 => 6.78,
                < 10 => 15.75,
                < 100 => 30.13,
                _ => 45.67
            };
        }
    }
}