// ------------------------------------------------------------------------------------------------------
// <copyright file="WalletStatsExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Blockchain.Abstractions.Models;
using Nomis.Blockchain.Abstractions.Stats;

namespace Nomis.Blockchain.Abstractions.Extensions
{
    /// <summary>
    /// <see cref="IWalletStats"/> extension methods.
    /// </summary>
    public static class WalletStatsExtensions
    {
        /// <summary>
        /// Get wallet score.
        /// </summary>
        /// <param name="stats"><see cref="IWalletStats"/>.</param>
        /// <returns>Returns wallet score.</returns>
        public static double GetScore<TWalletStats, TTransactionIntervalData>(
            this TWalletStats stats)
            where TWalletStats : IWalletCommonStats<TTransactionIntervalData>
            where TTransactionIntervalData : class, ITransactionIntervalData
        {
            double result = 0;
            if (stats is IWalletStats walletStats)
            {
                result += walletStats.GetScore();
            }

            if (stats is IWalletCommonStats<TTransactionIntervalData> commonStats)
            {
                if (commonStats.NoData)
                {
                    return result;
                }

                result += commonStats.GetScore();
            }

            if (stats is IWalletBalanceStats balanceStats)
            {
                result += balanceStats.GetScore();
            }

            if (stats is IWalletTransactionStats transactionStats)
            {
                result += transactionStats.GetScore();
            }

            if (stats is IWalletNftStats nftStats)
            {
                result += nftStats.GetScore();
            }

            if (stats is IWalletTokenStats tokenStats)
            {
                result += tokenStats.GetScore();
            }

            // add additional scores stored in wallet stats implementation class
            foreach (var additionalScore in stats.AdditionalScores)
            {
                result += additionalScore.Invoke();
            }

            return result;
        }
    }
}