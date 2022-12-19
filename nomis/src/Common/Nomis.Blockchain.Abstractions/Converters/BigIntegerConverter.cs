// ------------------------------------------------------------------------------------------------------
// <copyright file="BigIntegerConverter.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Globalization;
using System.Numerics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Nomis.Blockchain.Abstractions.Converters
{
    /// <summary>
    /// <see cref="BigInteger"/> converter.
    /// </summary>
    public sealed class BigIntegerConverter :
        JsonConverter<BigInteger>
    {
        /// <inheritdoc />
        public override BigInteger Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType != JsonTokenType.Number)
            {
                throw new JsonException($"Found token {reader.TokenType} but expected token {JsonTokenType.Number}");
            }

            using var doc = JsonDocument.ParseValue(ref reader);
            return BigInteger.Parse(doc.RootElement.GetRawText(), NumberFormatInfo.InvariantInfo);
        }

        /// <inheritdoc />
        public override void Write(Utf8JsonWriter writer, BigInteger value, JsonSerializerOptions options) =>
            writer.WriteRawValue(value.ToString(NumberFormatInfo.InvariantInfo));
    }
}