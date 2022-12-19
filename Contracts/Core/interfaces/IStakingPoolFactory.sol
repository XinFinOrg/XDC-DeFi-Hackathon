// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IStakingPoolFactory {
    function getPool(address token) external view returns (address pool);

    function allPools() external view returns (address[] memory);

    function allPoolsLength() external view returns (uint256);

    function createPool(address stoken, address rtoken)
        external
        returns (address);
}
