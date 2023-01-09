// ------------------------------------------------------------------------------------------------------
// <copyright file="IgnoreMemberAttribute.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Domain.Contracts;

namespace Nomis.Domain.Attributes
{
    /// <summary>
    /// An attribute indicating that the property or field <see cref="IValueObject"/> value marked by it should not be taken into account in the comparison.
    /// </summary>
    /// <remarks>
    /// Used when getting a list of properties or fields for <see cref="IValueObject"/>.
    /// </remarks>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class IgnoreMemberAttribute :
        Attribute
    {
    }
}