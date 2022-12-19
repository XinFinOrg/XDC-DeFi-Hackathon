// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IStakingPool {
    function staked(address user) external view returns (uint256);

    function rewards(address user) external view returns (uint256);

    function totalSupply() external view returns (uint256);

    function rewardPerToken() external view returns (uint256);

    function earned(address account) external view returns (uint256);

    function stake(uint256 _amount, address user) external;

    function withdraw(uint256 _amount, address user) external;

    function reedemReward(address user) external;
}
