// ------------------------------------------------------------------------------------------------------
// <copyright file="TypeExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.ComponentModel;
using System.Text.RegularExpressions;

namespace Nomis.Utils.Extensions
{
    /// <summary>
    /// <see cref="Type"/> extension methods.
    /// </summary>
    public static class TypeExtensions
    {
        /// <summary>
        /// Get the name of the generic type.
        /// </summary>
        /// <param name="type">Тип.</param>
        /// <returns>Returns the name of the generic type.</returns>
        public static string GetGenericTypeName(this Type type)
        {
            if (type.IsGenericType)
            {
                string genericTypes = string.Join(",", type.GetGenericArguments().Select(GetGenericTypeName).ToArray());
                return $"{type.Name.Remove(type.Name.IndexOf('`'))}<{genericTypes}>";
            }

            return type.Name;
        }

        /// <summary>
        /// Convert enum value to string stored in <see cref="DescriptionAttribute"/>.
        /// </summary>
        /// <param name="enumValue">Enum value.</param>
        /// <returns>Returns string stored in <see cref="DescriptionAttribute"/>.</returns>
        public static string ToDescriptionString(this Enum enumValue)
        {
            var attributes = (DescriptionAttribute[]?)enumValue
                .GetType()
                .GetField(enumValue.ToString())?
                .GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (attributes?.Length > 0)
            {
                return attributes[0].Description;
            }

            string result = enumValue.ToString();
            result = Regex.Replace(result, "([a-z])([A-Z])", "$1 $2");
            result = Regex.Replace(result, "([A-Za-z])([0-9])", "$1 $2");
            result = Regex.Replace(result, "([0-9])([A-Za-z])", "$1 $2");
            result = Regex.Replace(result, "(?<!^)(?<! )([A-Z][a-z])", " $1");

            return result;
        }
    }
}