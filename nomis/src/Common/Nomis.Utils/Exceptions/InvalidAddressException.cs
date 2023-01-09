// ------------------------------------------------------------------------------------------------------
// <copyright file="InvalidAddressException.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Net;

namespace Nomis.Utils.Exceptions
{
    /// <summary>
    /// Invalid address exception.
    /// </summary>
    public class InvalidAddressException :
        CustomException
    {
        /// <summary>
        /// Initialize <see cref="InvalidAddressException"/>.
        /// </summary>
        /// <param name="message">Exception message.</param>
        public InvalidAddressException(string message)
            : base(message, statusCode: HttpStatusCode.BadRequest)
        {
        }
    }
}