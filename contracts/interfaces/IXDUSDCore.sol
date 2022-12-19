

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

interface IXDUSDCore {
    function mint(address _caller, uint256 _amountToMint)
        external
        returns (bool);
}
