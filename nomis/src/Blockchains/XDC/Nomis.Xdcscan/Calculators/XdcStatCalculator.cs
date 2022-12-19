// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcStatCalculator.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Numerics;

using Nomis.Blockchain.Abstractions.Calculators;
using Nomis.Blockchain.Abstractions.Models;
using Nomis.Xdcscan.Interfaces.Extensions;
using Nomis.Xdcscan.Interfaces.Models;

namespace Nomis.Xdcscan.Calculators
{
    /// <summary>
    /// Xdc wallet stats calculator.
    /// </summary>
    internal sealed class XdcStatCalculator :
        IStatCalculator<XdcWalletStats, XdcTransactionIntervalData>
    {
        private readonly string _address;
        private readonly XdcscanAccount _accountData;
        private readonly decimal _usdBalance;
        private readonly IEnumerable<XdcscanAccountNormalTransaction> _transactions;
        private readonly IEnumerable<XdcscanAccountInternalTransaction> _internalTransactions;
        private readonly IEnumerable<IXdcscanAccountNftTokenEvent> _nftTokenTransactions;
        private readonly IEnumerable<XdcscanAccountXRC20TokenEvent> _xrc20TokenTransactions;
        private readonly long _holderNftCount;

        public XdcStatCalculator(
            string address,
            XdcscanAccount accountData,
            decimal usdBalance,
            IEnumerable<XdcscanAccountNormalTransaction> transactions,
            IEnumerable<XdcscanAccountInternalTransaction> internalTransactions,
            IEnumerable<IXdcscanAccountNftTokenEvent> nftTokenTransactions,
            IEnumerable<XdcscanAccountXRC20TokenEvent> xrc20TokenTransactions,
            long holderNftCount)
        {
            _address = address;
            _accountData = accountData;
            _usdBalance = usdBalance;
            _transactions = transactions;
            _internalTransactions = internalTransactions;
            _nftTokenTransactions = nftTokenTransactions;
            _xrc20TokenTransactions = xrc20TokenTransactions;
            _holderNftCount = holderNftCount;
        }

        public XdcWalletStats GetStats()
        {
            if (!_transactions.Any())
            {
                return new()
                {
                    NoData = true
                };
            }

            var intervals = IStatCalculator
                .GetTransactionsIntervals(_transactions.Select(x => x.Timestamp)).ToList();
            if (intervals.Count == 0)
            {
                return new()
                {
                    NoData = true
                };
            }

            var monthAgo = DateTime.Now.AddMonths(-1);
            var yearAgo = DateTime.Now.AddYears(-1);

            var soldTokens = _nftTokenTransactions.Where(x => x.From?.Equals(_address, StringComparison.InvariantCultureIgnoreCase) == true).ToList();
            var soldSum = IStatCalculator
                .GetTokensSum(soldTokens.Select(x => x.TransactionHash!), _internalTransactions.Select(x => (x.Hash!, BigInteger.TryParse(x.Value, out var amount) ? amount : 0)));

            var soldTokensIds = soldTokens.Select(x => x.GetTokenUid());
            var buyTokens = _nftTokenTransactions.Where(x => x.To?.Equals(_address, StringComparison.InvariantCultureIgnoreCase) == true && soldTokensIds.Contains(x.GetTokenUid()));
            var buySum = IStatCalculator
                .GetTokensSum(buyTokens.Select(x => x.TransactionHash!), _internalTransactions.Select(x => (x.Hash!, BigInteger.TryParse(x.Value, out var amount) ? amount : 0)));

            var buyNotSoldTokens = _nftTokenTransactions.Where(x => x.To?.Equals(_address, StringComparison.InvariantCultureIgnoreCase) == true && !soldTokensIds.Contains(x.GetTokenUid()));
            var buyNotSoldSum = IStatCalculator
                .GetTokensSum(buyNotSoldTokens.Select(x => x.TransactionHash!), _internalTransactions.Select(x => (x.Hash!, BigInteger.TryParse(x.Value, out var amount) ? amount : 0)));

            int holdingTokens = _holderNftCount == 0 ? _nftTokenTransactions.Count() - soldTokens.Count : (int)_holderNftCount;
            decimal nftWorth = buySum == 0 ? 0 : (decimal)soldSum / (decimal)buySum * (decimal)buyNotSoldSum;
            int contractsCreated = _transactions.Count(x => !string.IsNullOrWhiteSpace(x.ContractAddress));
            var totalTokens = _xrc20TokenTransactions.Select(x => x.Symbol).Distinct();

            var turnoverIntervalsDataList =
                _transactions.Select(x => new TurnoverIntervalsData(
                    x.Timestamp,
                    BigInteger.TryParse(x.Value, out var value) ? value : 0,
                    x.From?.Equals(_address, StringComparison.InvariantCultureIgnoreCase) == true));
            var turnoverIntervals = IStatCalculator<XdcTransactionIntervalData>
                .GetTurnoverIntervals(turnoverIntervalsDataList, _transactions.Min(x => x.Timestamp)).ToList();

            return new()
            {
                Balance = _accountData.BalanceNumber,
                BalanceUSD = _usdBalance,
                WalletAge = IStatCalculator
                    .GetWalletAge(new List<DateTime> { _accountData.CreatedAt }),
                TotalTransactions = (int)_accountData.TransactionCount,
                TotalRejectedTransactions = _transactions.Count(t => !t.Status),
                MinTransactionTime = intervals.Min(),
                MaxTransactionTime = intervals.Max(),
                AverageTransactionTime = intervals.Average(),
                WalletTurnover = _transactions.Sum(x => decimal.TryParse(x.Value, out decimal value) ? value : 0).ToXdc(),
                BalanceChangeInLastMonth = IStatCalculator<XdcTransactionIntervalData>.GetBalanceChangeInLastMonth(turnoverIntervals),
                BalanceChangeInLastYear = IStatCalculator<XdcTransactionIntervalData>.GetBalanceChangeInLastYear(turnoverIntervals),
                TurnoverIntervals = turnoverIntervals,
                LastMonthTransactions = _transactions.Count(x => x.Timestamp > monthAgo),
                LastYearTransactions = _transactions.Count(x => x.Timestamp > yearAgo),
                TimeFromLastTransaction = (int)((DateTime.UtcNow - _transactions.OrderBy(x => x.Timestamp).Last().Timestamp).TotalDays / 30),
                NftHolding = holdingTokens,
                NftTrading = (soldSum - buySum).ToXdc(),
                NftWorth = nftWorth.ToXdc(),
                DeployedContracts = contractsCreated,
                TokensHolding = totalTokens.Count()
            };
        }
    }
}