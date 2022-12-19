// ------------------------------------------------------------------------------------------------------
// <copyright file="XdcController.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;
using System.Net.Mime;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nomis.Utils.Wrapper;
using Nomis.Xdcscan.Interfaces;
using Nomis.Xdcscan.Interfaces.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace Nomis.Api.Xdc
{
    /// <summary>
    /// A controller to aggregate all XDC-related actions.
    /// </summary>
    [Route(BasePath)]
    [ApiVersion("1")]
    [SwaggerTag("XDC Network blockchain.")]
    public sealed class XdcController :
        ControllerBase
    {
        /// <summary>
        /// Base path for routing.
        /// </summary>
        internal const string BasePath = "api/v{version:apiVersion}/xdc";

        /// <summary>
        /// Common tag for XDC actions.
        /// </summary>
        internal const string XdcTag = "Xdc";

        private readonly ILogger<XdcController> _logger;
        private readonly IXdcScoringService _scoringService;

        /// <summary>
        /// Initialize <see cref="XdcController"/>.
        /// </summary>
        /// <param name="scoringService"><see cref="IXdcScoringService"/>.</param>
        /// <param name="logger"><see cref="ILogger{T}"/>.</param>
        public XdcController(
            IXdcScoringService scoringService,
            ILogger<XdcController> logger)
        {
            _scoringService = scoringService ?? throw new ArgumentNullException(nameof(scoringService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Get Nomis Score for given wallet address.
        /// </summary>
        /// <param name="address" example="xdca4c7e09c74faf6EbE73A5a3E17dbbD34c98D8393">XDC wallet address to get Nomis Score.</param>
        /// <returns>An Nomis Score value and corresponding statistical data.</returns>
        /// <remarks>
        /// Sample request:
        ///     GET /api/v1/xdc/wallet/xdc281eBd3E6186E71B8591F9CbcD33A572B057f86b/score
        /// </remarks>
        /// <response code="200">Returns Nomis Score and stats.</response>
        /// <response code="400">Address not valid.</response>
        /// <response code="404">No data found.</response>
        /// <response code="500">Unknown internal error.</response>
        [HttpGet("wallet/{address}/score", Name = "GetXdcWalletScore")]
        [AllowAnonymous]
        [SwaggerOperation(
            OperationId = "GetXdcWalletScore",
            Tags = new[] { XdcTag })]
        [ProducesResponseType(typeof(Result<XdcWalletScore>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResult<string>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorResult<string>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResult<string>), StatusCodes.Status500InternalServerError)]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetXdcWalletScoreAsync(
            [Required(ErrorMessage = "Wallet address should be set")] string address)
        {
            var result = await _scoringService.GetWalletStatsAsync(address);
            return Ok(result);
        }
    }
}