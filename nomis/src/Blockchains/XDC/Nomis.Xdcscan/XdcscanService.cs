// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanService.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json;

using Nomis.Blockchain.Abstractions.Extensions;
using Nomis.Coingecko.Interfaces;
using Nomis.Domain.Scoring.Entities;
using Nomis.ScoringService.Interfaces;
using Nomis.Utils.Contracts.Services;
using Nomis.Utils.Wrapper;
using Nomis.Xdcscan.Calculators;
using Nomis.Xdcscan.Interfaces;
using Nomis.Xdcscan.Interfaces.Enums;
using Nomis.Xdcscan.Interfaces.Models;
using Nomis.Xdcscan.Responses;

namespace Nomis.Xdcscan
{
    /// <inheritdoc cref="IXdcScoringService"/>
    internal sealed class XdcscanService :
        IXdcScoringService,
        ITransientService
    {
        private readonly IXdcscanClient _client;
        private readonly ICoingeckoService _coingeckoService;
        private readonly IScoringService _scoringService;

        /// <summary>
        /// Initialize <see cref="XdcscanService"/>.
        /// </summary>
        /// <param name="client"><see cref="IXdcscanClient"/>.</param>
        /// <param name="coingeckoService"><see cref="ICoingeckoService"/>.</param>
        /// <param name="scoringService"><see cref="IScoringService"/>.</param>
        public XdcscanService(
            IXdcscanClient client,
            ICoingeckoService coingeckoService,
            IScoringService scoringService)
        {
            _client = client;
            _coingeckoService = coingeckoService;
            _scoringService = scoringService;
        }

        /// <inheritdoc />
        public ulong ChainId => 50;

        /// <inheritdoc/>
        public bool IsEVMCompatible => true;

        /// <inheritdoc/>
        public async Task<Result<XdcWalletScore>> GetWalletStatsAsync(string address, CancellationToken cancellationToken = default)
        {
            var accountData = await _client.GetAccountDataAsync(address);
            decimal usdBalance = await _coingeckoService.GetUsdBalanceAsync<CoingeckoXdcUsdPriceResponse>(accountData.BalanceNumber, "xdce-crowd-sale");
            var transactions = (await _client.GetTransactionsAsync<XdcscanAccountNormalTransactions, XdcscanAccountNormalTransaction>(address)).ToList();
            var internalTransactions = (await _client.GetTransactionsAsync<XdcscanAccountInternalTransactions, XdcscanAccountInternalTransaction>(address)).ToList();

            var xrc20TokenTransactions = accountData.HasXrc20
                ? (await _client.GetTransactionsAsync<XdcscanAccountXRC20TokenEvents, XdcscanAccountXRC20TokenEvent>(address)).ToList()
                : new();

            long holderNftCount = (await _client.GetHolderTokensDataAsync(address, XdcscanTokenType.Xrc721)).Total
                            + (await _client.GetHolderTokensDataAsync(address, XdcscanTokenType.Xrc1155)).Total;
            var xrc721TokenTransactions = accountData.HasXrc721
                ? (await _client.GetTransactionsAsync<XdcscanAccountXRC721TokenEvents, XdcscanAccountXRC721TokenEvent>(address)).ToList()
                : new();

            var xrc1155TokenTransactions = accountData.HasXrc1155
                ? (await _client.GetTransactionsAsync<XdcscanAccountXRC1155TokenEvents, XdcscanAccountXRC1155TokenEvent>(address)).ToList()
                : new();

            var nftTokenTransactions = new List<IXdcscanAccountNftTokenEvent>();
            nftTokenTransactions.AddRange(xrc721TokenTransactions);
            nftTokenTransactions.AddRange(xrc1155TokenTransactions);

            var walletStats = new XdcStatCalculator(
                    address,
                    accountData,
                    usdBalance,
                    transactions,
                    internalTransactions,
                    nftTokenTransactions,
                    xrc20TokenTransactions,
                    holderNftCount)
                .GetStats();

            double score = walletStats.GetScore<XdcWalletStats, XdcTransactionIntervalData>();
            var scoringData = new ScoringData(address, address, ChainId, score, JsonSerializer.Serialize(walletStats));
            await _scoringService.SaveScoringDataToDatabaseAsync(scoringData, cancellationToken);

            return await Result<XdcWalletScore>.SuccessAsync(
                new()
                {
                    Address = address,
                    Stats = walletStats,
                    Score = score
                }, "Got XDC wallet score.");
        }
    }
}