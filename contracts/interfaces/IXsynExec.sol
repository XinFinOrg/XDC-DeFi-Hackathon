// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)
pragma solidity ^0.8.0;

interface IXsynExec {
    function mint(address _caller, uint256 _amountToMint)
        external
        returns (bool);

    function balanceOf(address account) external view returns (uint256);
}
