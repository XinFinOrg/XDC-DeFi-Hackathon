// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanClient.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Net.Http.Json;

using Microsoft.Extensions.Options;
using Nomis.Utils.Exceptions;
using Nomis.Xdcscan.Interfaces;
using Nomis.Xdcscan.Interfaces.Enums;
using Nomis.Xdcscan.Interfaces.Models;
using Nomis.Xdcscan.Settings;

namespace Nomis.Xdcscan
{
    /// <inheritdoc cref="IXdcscanClient"/>
    internal sealed class XdcscanClient :
        IXdcscanClient
    {
        private const int ItemsFetchLimit = 100;

        private readonly HttpClient _client;

        /// <summary>
        /// Initialize <see cref="XdcscanClient"/>.
        /// </summary>
        /// <param name="xdcscanSettings"><see cref="XdcscanSettings"/>.</param>
        public XdcscanClient(
            IOptions<XdcscanSettings> xdcscanSettings)
        {
            _client = new()
            {
                BaseAddress = new(xdcscanSettings.Value.ApiBaseUrl ??
                                  throw new ArgumentNullException(nameof(xdcscanSettings.Value.ApiBaseUrl)))
            };
        }

        /// <inheritdoc/>
        public async Task<XdcscanAccount> GetAccountDataAsync(string address)
        {
            string request =
                $"/api/accounts/{address}";
            var response = await _client.GetAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<XdcscanAccount>() ?? throw new CustomException("Can't get account data.");
        }

        /// <inheritdoc/>
        public async Task<XdcscanAccountHolderTokens> GetHolderTokensDataAsync(string address, XdcscanTokenType tokenType)
        {
            string request =
                $"/api/tokens/holding/{tokenType.ToString().ToLowerInvariant()}/{address}";
            var response = await _client.GetAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<XdcscanAccountHolderTokens>() ?? throw new CustomException("Can't get account tokens.");
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<TResultItem>> GetTransactionsAsync<TResult, TResultItem>(string address)
            where TResult : IXdcscanTransferList<TResultItem>
            where TResultItem : IXdcscanTransfer
        {
            int page = 1;
            var result = new List<TResultItem>();
            var transactionsData = await GetTransactionListAsync<TResult>(address);
            result.AddRange(transactionsData.Items ?? new List<TResultItem>());
            while (transactionsData?.Items?.Count >= ItemsFetchLimit)
            {
                transactionsData = await GetTransactionListAsync<TResult>(address, page);
                result.AddRange(transactionsData?.Items ?? new List<TResultItem>());
                page++;
            }

            return result;
        }

        private async Task<TResult> GetTransactionListAsync<TResult>(
            string address,
            int page = 1)
        {
            string request = "/api";

            if (typeof(TResult) == typeof(XdcscanAccountNormalTransactions))
            {
                request = $"{request}/txs/listByAccount/{address}?page={page}&limit={ItemsFetchLimit}";
            }
            else if (typeof(TResult) == typeof(XdcscanAccountInternalTransactions))
            {
                request = $"{request}/txs/internal/{address}?page={page}&limit={ItemsFetchLimit}";
            }
            else if (typeof(TResult) == typeof(XdcscanAccountXRC20TokenEvents))
            {
                request = $"{request}/token-txs/xrc20?holder={address}&page={page}&limit={ItemsFetchLimit}";
            }
            else if (typeof(TResult) == typeof(XdcscanAccountXRC721TokenEvents))
            {
                request = $"{request}/token-txs/xrc721?holder={address}&page={page}&limit={ItemsFetchLimit}";
            }
            else if (typeof(TResult) == typeof(XdcscanAccountXRC1155TokenEvents))
            {
                request = $"{request}/token-txs/xrc1155?holder={address}&page={page}&limit={ItemsFetchLimit}";
            }
            else
            {
                return default!;
            }

            var response = await _client.GetAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<TResult>() ?? throw new CustomException("Can't get account transactions.");
        }
    }
}