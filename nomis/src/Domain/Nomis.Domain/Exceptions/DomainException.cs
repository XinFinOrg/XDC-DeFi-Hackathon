// ------------------------------------------------------------------------------------------------------
// <copyright file="DomainException.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Net;

using Nomis.Utils.Exceptions;

namespace Nomis.Domain.Exceptions
{
    /// <summary>
    /// Domain level exception.
    /// </summary>
    public class DomainException :
        CustomException
    {
        /// <summary>
        /// Initialize <see cref="DomainException"/>.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <param name="errors">Errors list.</param>
        /// <param name="statusCode">HTTP status code.</param>
        public DomainException(
            string message,
            List<string>? errors = default,
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
            : base(message, errors, statusCode)
        {
        }

        /// <summary>
        /// Initialize <see cref="DomainException"/>.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <param name="errors">Errors list.</param>
        /// <param name="statusCode">HTTP status code.</param>
        /// <param name="args">Message arguments.</param>
        public DomainException(
            string message,
            List<string>? errors = default,
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError,
            params object[] args)
            : base(message, errors, statusCode, args)
        {
        }
    }
}