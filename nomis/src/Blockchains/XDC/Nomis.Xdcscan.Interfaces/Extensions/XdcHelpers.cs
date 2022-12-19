// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcHelpers.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Numerics;

using Nomis.Xdcscan.Interfaces.Models;

namespace Nomis.Xdcscan.Interfaces.Extensions
{
    /// <summary>
    /// Extension methods for XDC.
    /// </summary>
    public static class XdcHelpers
    {
        /// <summary>
        /// Convert Wei value to XDC.
        /// </summary>
        /// <param name="valueInWei">Wei.</param>
        /// <returns>Returns total XDC.</returns>
        public static decimal ToXdc(this string valueInWei)
        {
            if (!decimal.TryParse(valueInWei, out decimal wei))
            {
                return 0;
            }

            return wei.ToXdc();
        }

        /// <summary>
        /// Convert Wei value to XDC.
        /// </summary>
        /// <param name="valueInWei">Wei.</param>
        /// <returns>Returns total XDC.</returns>
        public static decimal ToXdc(this in BigInteger valueInWei)
        {
            return (decimal)valueInWei * 0.000_000_000_000_000_001M;
        }

        /// <summary>
        /// Convert Wei value to XDC.
        /// </summary>
        /// <param name="valueInWei">Wei.</param>
        /// <returns>Returns total XDC.</returns>
        public static decimal ToXdc(this decimal valueInWei)
        {
            return new BigInteger(valueInWei).ToXdc();
        }

        /// <summary>
        /// Get token UID based on it ContractAddress and Id.
        /// </summary>
        /// <param name="token">Token info.</param>
        /// <returns>Returns token UID.</returns>
        public static string GetTokenUid(this IXdcscanAccountNftTokenEvent token)
        {
            return token.Address + "_" + token.TokenId;
        }
    }
}