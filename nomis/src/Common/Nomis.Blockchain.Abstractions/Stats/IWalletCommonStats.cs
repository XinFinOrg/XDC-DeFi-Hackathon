// ------------------------------------------------------------------------------------------------------
// <copyright file="IWalletCommonStats.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

using Nomis.Blockchain.Abstractions.Models;

namespace Nomis.Blockchain.Abstractions.Stats
{
    /// <summary>
    /// Wallet common stats.
    /// </summary>
    public interface IWalletCommonStats<TTransactionIntervalData> :
        IWalletStats
        where TTransactionIntervalData : class, ITransactionIntervalData
    {
        private const double WalletAgePercents = 32.34 / 100;
        private const double WalletTurnoverPercents = 16.31 / 100;

        /// <summary>
        /// Additional wallet stats scoring calculation functions.
        /// </summary>
        [JsonIgnore]
        IEnumerable<Func<double>> AdditionalScores => new List<Func<double>>();

        /// <summary>
        /// The list of properties excluded from <see cref="StatsDescriptions"/>.
        /// </summary>
        [JsonIgnore]
        static IEnumerable<string> ExcludedStatDescriptions => new List<string>
        {
            nameof(AdditionalScores),
            nameof(NoData),
            nameof(TurnoverIntervals),
            nameof(StatsDescriptions),
            nameof(ExcludedStatDescriptions)
        };

        /// <summary>
        /// No data.
        /// </summary>
        public bool NoData { get; init; }

        /// <summary>
        /// Wallet age (months).
        /// </summary>
        public int WalletAge { get; set; }

        /// <summary>
        /// The movement of funds on the wallet (Native token).
        /// </summary>
        public decimal WalletTurnover { get; set; }

        /// <summary>
        /// The intervals of funds movements on the wallet.
        /// </summary>
        public IEnumerable<TTransactionIntervalData>? TurnoverIntervals { get; set; }

        /// <summary>
        /// Wallet stats descriptions.
        /// </summary>
        public Dictionary<string, PropertyData> StatsDescriptions { get; }

        /// <summary>
        /// Get wallet common stats score.
        /// </summary>
        /// <returns>Returns wallet common stats score.</returns>
        public new double GetScore()
        {
            double result = WalletAgeScore(WalletAge) / 100 * WalletAgePercents;
            result += WalletTurnoverScore(WalletTurnover) / 100 * WalletTurnoverPercents;

            return result;
        }

        private static double WalletAgeScore(int walletAgeMonths)
        {
            return walletAgeMonths switch
            {
                < 1 => 7.14,
                < 12 => 36,
                < 24 => 60,
                _ => 100.0
            };
        }

        private static double WalletTurnoverScore(decimal turnover)
        {
            return turnover switch
            {
                < 10 => 2.76,
                < 50 => 6.38,
                < 100 => 14.71,
                < 1000 => 33.27,
                _ => 60.07
            };
        }
    }
}