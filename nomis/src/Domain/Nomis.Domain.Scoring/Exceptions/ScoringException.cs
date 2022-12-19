// ------------------------------------------------------------------------------------------------------
// <copyright file="ScoringException.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Net;

using Nomis.Domain.Exceptions;

namespace Nomis.Domain.Scoring.Exceptions
{
    /// <summary>
    /// Exception related to scoring.
    /// </summary>
    public class ScoringException :
        DomainException
    {
        /// <summary>
        /// Initialize <see cref="ScoringException"/>.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <param name="errors">Error list.</param>
        /// <param name="statusCode">HTTP status code.</param>
        public ScoringException(string message, List<string>? errors = default, HttpStatusCode statusCode = default)
            : base(message, errors, statusCode)
        {
        }
    }
}