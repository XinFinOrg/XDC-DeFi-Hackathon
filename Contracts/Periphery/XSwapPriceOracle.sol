// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./libraries/XSwapLibrary.sol";
import "../Core/interfaces/IXSwapPair.sol";

contract XSwapPriceOracle {
    address public immutable factory;
    address public immutable WETH;

    constructor(address _factory, address _WETH) {
        factory = _factory;
        WETH = _WETH;
    }

    /// returns the price of A with respect to B
    /// 1 A = price * ( B )
    function getPriceA(address tokenA, address tokenB)
        public
        view
        returns (uint256 priceA)
    {
        address pair = XSwapLibrary.pairFor(factory, tokenA, tokenB);
        // priceA = IXSwapPair(pair).price0CumulativeLast();
        priceA = (reserveB/reserveA);
    }

    function getPriceB(address tokenA, address tokenB)
        public
        view
        returns (uint256 priceB)
    {
        address pair = XSwapLibrary.pairFor(factory, tokenA, tokenB);
        // priceB = IXSwapPair(pair).price1CumulativeLast();
        (uint reserveA ,uint reserveB ,uint timeStamp )= IXSwapPair(pair).getReserves() ;
        priceB = (reserveA/reserveB);
    }
}
