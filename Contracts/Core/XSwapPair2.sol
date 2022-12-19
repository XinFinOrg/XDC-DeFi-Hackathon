// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./XSwapERC20.sol";
import "./interfaces/IERC20.sol";

contract XSwapPair2 is XSwapERC20 {
    // created token contract instance
    IERC20 public immutable token0;
    IERC20 public immutable token1;

    // tracks the internal balance of both the tokens
    uint256 public reserve0;
    uint256 public reserve1;

    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;
    uint256 public kLast;

    constructor(address _token0, address _token1) {
        // token intialisation
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    // to update the reserve of both the tokens of this contract
    function _update(uint256 _reserve0, uint256 _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    // swap 2 tokens which are in AMM
    function swap(address _tokenIn, uint256 _amountIn)
        external
        returns (uint256 amountOut)
    {
        // the tokens can just be token0  or token1
        require(
            _tokenIn == address(token0) || _tokenIn == address(token1),
            "invalid token"
        );

        require(_amountIn > 0, "amount in = 0");

        /// checking if the token is token0
        bool isToken0 = _tokenIn == address(token0);

        /// assigning the tokens on the basis of bool to be able to call some functions
        (
            IERC20 tokenIn,
            IERC20 tokenOut,
            uint256 reserveIn,
            uint256 reserveOut
        ) = isToken0
                ? (token0, token1, reserve0, reserve1)
                : (token1, token0, reserve1, reserve0);

        /// transferring the tokens from sender to this contract
        tokenIn.transferFrom(msg.sender, address(this), _amountIn);

        // 0.3% fee
        uint256 amountInWithFee = (_amountIn * 997) / 1000;

        /*
        ydx / (x + dx) = dy
        */
        // y = reserveOut , dy = amountOut
        // x = reserveIn , dx = amountInWithFee
        amountOut =
            (reserveOut * amountInWithFee) /
            (reserveIn + amountInWithFee);

        /// tokensOut transferred to the sender
        tokenOut.transfer(msg.sender, amountOut);

        // swap complete

        // updating the reserve of the contract
        _update(
            token0.balanceOf(address(this)),
            token1.balanceOf(address(this))
        );
    }

    function addLiquidity(uint256 _amount0, uint256 _amount1)
        external
        returns (uint256 shares)
    {
        /// transferring the tokens to the contract first
        token0.transferFrom(msg.sender, address(this), _amount0);
        token1.transferFrom(msg.sender, address(this), _amount1);

        if (reserve0 > 0 || reserve1 > 0) {
            require(
                reserve0 * _amount1 == reserve1 * _amount0,
                "x / y != dx / dy"
            );
        }

        if (totalSupply == 0) {
            /// then S = T = sqrt(XY)
            shares = _sqrt(_amount0 * _amount1);
        } else {
            /// whichever value is minimum will be the amount of shares of (dx * T / x ) or (dy * T / y)
            shares = _min(
                (_amount0 * totalSupply) / reserve0,
                (_amount1 * totalSupply) / reserve1
            );
        }

        require(shares > 0, "shares = 0");

        /// mint the shares for the user
        _mint(msg.sender, shares);

        /// update the reserve of the tokens again
        _update(
            token0.balanceOf(address(this)),
            token1.balanceOf(address(this))
        );
    }

    function removeLiquidity(uint256 _shares)
        external
        returns (uint256 amount0, uint256 amount1)
    {
        // fetching the current balance from the contract
        // bal0 >= reserve0
        // bal1 >= reserve1
        uint256 bal0 = token0.balanceOf(address(this));
        uint256 bal1 = token1.balanceOf(address(this));

        /// calculating the amounts of both the tokens
        amount0 = (_shares * bal0) / totalSupply;
        amount1 = (_shares * bal1) / totalSupply;
        require(amount0 > 0 && amount1 > 0, "amount0 or amount1 = 0");

        /// burn the shares and update the reserve
        _burn(msg.sender, _shares);
        _update(bal0 - amount0, bal1 - amount1);

        /// now transferring the tokens back to the user
        token0.transfer(msg.sender, amount0);
        token1.transfer(msg.sender, amount1);
    }

    /// function to find the square root of a value
    function _sqrt(uint256 y) private pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    /// function to find the minimum of both the values
    function _min(uint256 x, uint256 y) private pure returns (uint256) {
        return x <= y ? x : y;
    }
}
