// ------------------------------------------------------------------------------------------------------
// <copyright file="IBusinessRule.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.Domain.Contracts
{
    /// <summary>
    /// Business rule.
    /// </summary>
    public interface IBusinessRule
    {
        /// <summary>
        /// Message.
        /// </summary>
        string Message { get; }

        /// <summary>
        /// Rule is broken.
        /// </summary>
        /// <returns>Returns true if the business rule is not executed. Otherwise - false.</returns>
        bool IsBroken();
    }
}