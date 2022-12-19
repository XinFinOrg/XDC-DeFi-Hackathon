// ------------------------------------------------------------------------------------------------------
// <copyright file="BusinessRuleValidationException.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Net;

using Nomis.Domain.Contracts;

namespace Nomis.Domain.Exceptions
{
    /// <summary>
    /// An exception that indicates that the business rule was not executed.
    /// </summary>
    public class BusinessRuleValidationException :
        DomainException
    {
        /// <summary>
        /// Initialize <see cref="BusinessRuleValidationException"/>.
        /// </summary>
        /// <param name="brokenRule"><see cref="IBusinessRule"/>.</param>
        public BusinessRuleValidationException(IBusinessRule brokenRule)
            : base(brokenRule.Message, statusCode: HttpStatusCode.Conflict)
        {
            BrokenRule = brokenRule;
        }

        /// <summary>
        /// <see cref="IBusinessRule"/>.
        /// </summary>
        public IBusinessRule BrokenRule { get; }
    }
}