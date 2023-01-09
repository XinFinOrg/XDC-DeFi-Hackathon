// ------------------------------------------------------------------------------------------------------
// <copyright file="IWalletTransactionStats.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Blockchain.Abstractions.Stats
{
    /// <summary>
    /// Wallet transaction stats.
    /// </summary>
    public interface IWalletTransactionStats :
        IWalletStats
    {
        private const double TotalTransactionsPercents = 9.99 / 100;
        private const double TransactionsPerMonthPercents = 18.00 / 100;
        private const double TransactionsLastMonthPercents = 10.34 / 100;
        private const double LastMonthPercents = 5.7 / 100;

        /// <summary>
        /// Total transactions on wallet (number).
        /// </summary>
        public int TotalTransactions { get; set; }

        /// <summary>
        /// Total rejected transactions on wallet (number).
        /// </summary>
        public int TotalRejectedTransactions { get; set; }

        /// <summary>
        /// Average time interval between transactions (hours).
        /// </summary>
        public double AverageTransactionTime { get; set; }

        /// <summary>
        /// Maximum time interval between transactions (hours).
        /// </summary>
        public double MaxTransactionTime { get; set; }

        /// <summary>
        /// Minimal time interval between transactions (hours).
        /// </summary>
        public double MinTransactionTime { get; set; }

        /// <summary>
        /// Time since last transaction (months).
        /// </summary>
        public int TimeFromLastTransaction { get; set; }

        /// <summary>
        /// Average transaction per months (number).
        /// </summary>
        public double TransactionsPerMonth { get; }

        /// <summary>
        /// Last month transactions (number).
        /// </summary>
        public int LastMonthTransactions { get; set; }

        /// <summary>
        /// Last year transactions on wallet (number).
        /// </summary>
        public int LastYearTransactions { get; set; }

        /// <summary>
        /// Get wallet transaction stats score.
        /// </summary>
        /// <returns>Returns wallet transaction stats score.</returns>
        public new double GetScore()
        {
            double result = TotalTransactionsScore(TotalTransactions) / 100 * TotalTransactionsPercents;

            double lastMonth = 0.0;
            lastMonth += TransactionsPerMonthScore(TransactionsPerMonth) / 100 * TransactionsPerMonthPercents;
            lastMonth += TransactionsLastMonthScore(LastMonthTransactions) / 100 * TransactionsLastMonthPercents;
            result += lastMonth * LastMonthPercents;

            return result;
        }

        private static double TotalTransactionsScore(int transactions)
        {
            return transactions switch
            {
                < 1 => 3.72,
                < 10 => 7.16,
                < 100 => 13.57,
                < 1000 => 26.79,
                _ => 48.77
            };
        }

        private static double TransactionsPerMonthScore(double value)
        {
            return value switch
            {
                < 1 => 2.35,
                < 10 => 5.44,
                < 50 => 12.56,
                < 100 => 28.39,
                _ => 51.26
            };
        }

        private static double TransactionsLastMonthScore(int value)
        {
            return value switch
            {
                < 1 => 2.35,
                < 10 => 5.44,
                < 50 => 12.56,
                < 100 => 28.39,
                _ => 51.26
            };
        }
    }
}