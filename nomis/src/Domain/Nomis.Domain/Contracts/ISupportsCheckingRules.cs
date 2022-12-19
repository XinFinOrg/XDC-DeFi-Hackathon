// ------------------------------------------------------------------------------------------------------
// <copyright file="ISupportsCheckingRules.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Exceptions;

namespace Nomis.Domain.Contracts
{
    /// <summary>
    /// Supports checking <see cref="IBusinessRule"/>.
    /// </summary>
    public interface ISupportsCheckingRules
    {
        /// <summary>
        /// Check business rule.
        /// </summary>
        /// <param name="rule">Business rule.</param>
        public virtual void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken())
            {
                throw new BusinessRuleValidationException(rule);
            }
        }
    }
}