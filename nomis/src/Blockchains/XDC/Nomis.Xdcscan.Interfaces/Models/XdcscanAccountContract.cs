// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcscanAccountContract.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Text.Json.Serialization;

namespace Nomis.Xdcscan.Interfaces.Models
{
    /// <summary>
    /// Xdcscan account contract data.
    /// </summary>
    public class XdcscanAccountContract
    {
        /// <summary>
        /// Id.
        /// </summary>
        [JsonPropertyName("_id")]
        public string? Id { get; set; }

        /// <summary>
        /// Hash.
        /// </summary>
        [JsonPropertyName("hash")]
        public string? Hash { get; set; }

        /// <summary>
        /// ABI code.
        /// </summary>
        [JsonPropertyName("abiCode")]
        public string? AbiCode { get; set; }

        /// <summary>
        /// Bytecode.
        /// </summary>
        [JsonPropertyName("bytecode")]
        public string? Bytecode { get; set; }

        /// <summary>
        /// Compiler.
        /// </summary>
        [JsonPropertyName("compiler")]
        public string? Compiler { get; set; }

        /// <summary>
        /// Contract name.
        /// </summary>
        [JsonPropertyName("contractName")]
        public string? ContractName { get; set; }

        /// <summary>
        /// Created at.
        /// </summary>
        [JsonPropertyName("createdAt")]
        public DateTime? CreatedAt { get; set; }

        /// <summary>
        /// Function hashes.
        /// </summary>
        [JsonPropertyName("functionHashes")]
        public Dictionary<string, string> FunctionHashes { get; set; } = new();

        /// <summary>
        /// Optimization.
        /// </summary>
        [JsonPropertyName("optimization")]
        public bool Optimization { get; set; }

        /// <summary>
        /// Source code.
        /// </summary>
        [JsonPropertyName("sourceCode")]
        public string? SourceCode { get; set; }

        /// <summary>
        /// Source map.
        /// </summary>
        [JsonPropertyName("sourceMap")]
        public string? SourceMap { get; set; }

        /// <summary>
        /// Transaction count.
        /// </summary>
        [JsonPropertyName("txCount")]
        public long TxCount { get; set; }

        /// <summary>
        /// Updated at.
        /// </summary>
        [JsonPropertyName("updatedAt")]
        public DateTime? UpdatedAt { get; set; }
    }
}