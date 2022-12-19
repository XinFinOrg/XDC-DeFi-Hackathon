// ------------------------------------------------------------------------------------------------------
// <copyright file="NoDataException.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Net;

namespace Nomis.Utils.Exceptions
{
    /// <summary>
    /// No data exception.
    /// </summary>
    public class NoDataException :
        CustomException
    {
        /// <summary>
        /// Initialize <see cref="NoDataException"/>.
        /// </summary>
        /// <param name="message">Exception message.</param>
        public NoDataException(string message)
            : base(message, statusCode: HttpStatusCode.BadRequest)
        {
        }
    }
}