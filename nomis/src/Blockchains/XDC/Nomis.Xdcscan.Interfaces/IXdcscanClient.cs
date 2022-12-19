// ------------------------------------------------------------------------------------------------------
// <copyright file="IXdcscanClient.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Xdcscan.Interfaces.Enums;
using Nomis.Xdcscan.Interfaces.Models;

namespace Nomis.Xdcscan.Interfaces
{
    /// <summary>
    /// Xdcscan client.
    /// </summary>
    public interface IXdcscanClient
    {
        /// <summary>
        /// Get the account data.
        /// </summary>
        /// <param name="address">Account address.</param>
        /// <returns>Returns <see cref="XdcscanAccount"/>.</returns>
        Task<XdcscanAccount> GetAccountDataAsync(string address);

        /// <summary>
        /// Get list token holding by holder.
        /// </summary>
        /// <param name="address">Account address.</param>
        /// <param name="tokenType">Token type.</param>
        /// <returns>Returns <see cref="XdcscanAccountHolderTokens"/>.</returns>
        Task<XdcscanAccountHolderTokens> GetHolderTokensDataAsync(string address, XdcscanTokenType tokenType);

        /// <summary>
        /// Get list of specific transactions/transfers of the given account.
        /// </summary>
        /// <typeparam name="TResult">The type of returned response.</typeparam>
        /// <typeparam name="TResultItem">The type of returned response data items.</typeparam>
        /// <param name="address">Account address.</param>
        /// <returns>Returns list of specific transactions/transfers of the given account.</returns>
        Task<IEnumerable<TResultItem>> GetTransactionsAsync<TResult, TResultItem>(string address)
            where TResult : IXdcscanTransferList<TResultItem>
            where TResultItem : IXdcscanTransfer;
    }
}