// ------------------------------------------------------------------------------------------------------
// <copyright file="IWalletBalanceStats.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Blockchain.Abstractions.Stats
{
    /// <summary>
    /// Wallet balance stats.
    /// </summary>
    public interface IWalletBalanceStats :
        IWalletStats
    {
        private const double BalancePercents = 26.88 / 100;

        /// <summary>
        /// Wallet balance (Native token).
        /// </summary>
        public decimal Balance { get; set; }

        /// <summary>
        /// Wallet balance (USD).
        /// </summary>
        // ReSharper disable once InconsistentNaming
        public decimal BalanceUSD { get; set; }

        /// <summary>
        /// The balance change value in the last month (Native token).
        /// </summary>
        public decimal BalanceChangeInLastMonth { get; set; }

        /// <summary>
        /// The balance change value in the last year (Native token).
        /// </summary>
        public decimal BalanceChangeInLastYear { get; set; }

        /// <summary>
        /// Get wallet balance stats score.
        /// </summary>
        /// <returns>Returns wallet balance stats score.</returns>
        public new double GetScore()
        {
            return BalanceScore(Balance) / 100 * BalancePercents;
        }

        private static double BalanceScore(decimal balance)
        {
            return balance switch
            {
                < 0m => 7.7,
                < 0.2m => 23.05,
                < 0.4m => 22.23,
                < 0.7m => 65.98,
                _ => 100.0
            };
        }
    }
}