// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../Core/interfaces/IStakingPool.sol";
import "../Core/interfaces/IStakingPoolFactory.sol";
import "../Other/interfaces/IERC20.sol";
import "../Other/interfaces/IXDC.sol";
import "./libraries/TransferHelper.sol";

// Stake Tokens
// Withdraw Tokens
// Withdraw Reward Token
/// Staking is done so in case of Emergency , 50% of the amount locked can be used for covering
/// The Reward Token can be used to pay gas fees for the Exchange and other DEFI activities in the future

contract StakingPoolRouter {
    address public immutable factory;
    address public immutable WEXDC;
    address public immutable rtoken;

    constructor(
        address _factory,
        address xdcWrapper,
        address _rtoken
    ) {
        factory = _factory;
        WEXDC = xdcWrapper;
        rtoken = _rtoken;
    }

    function getPoolAddress(address token) public view returns (address pool) {
        pool = IStakingPoolFactory(factory).getPool(token);
    }

    function getBalance(address token) public view returns (uint256 balance) {
        balance = IERC20(token).balanceOf(msg.sender);
    }

    function createPool(address sToken) public {
        address pool = getPoolAddress(sToken);
        require(pool == address(0), "Pool Exists");

        IStakingPoolFactory(factory).createPool(sToken, rtoken);
    }

    function getRewardEarned(address token, address user)
        public
        view
        returns (uint256 rewardAmount)
    {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool don't Exists");

        rewardAmount = IStakingPool(pool).rewards(user);
    }

    function getStaked(address user, address token)
        public
        view
        returns (uint256 stakedAmount)
    {
        address pool = getPoolAddress(token);
        stakedAmount = IStakingPool(pool).staked(user);
    }

    function stake(address token, uint256 _amount) public {
        address pool = getPoolAddress(token);
        if (pool != address(0)) {
            // TransferHelper.safeApprove(token, pool, _amount);
            IStakingPool(pool).stake(_amount, msg.sender);
        } else {
            createPool(token);

            // TransferHelper.safeApprove(token, pool, _amount);
            IStakingPool(pool).stake(_amount, msg.sender);
        }
    }

    function withdraw(address token, uint256 _amount) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Do Not Exists");

        uint256 stakedAmount = getStaked(msg.sender, token);
        require(stakedAmount >= _amount, "Incorrect Balance entered");

        IStakingPool(pool).withdraw(_amount, msg.sender);
    }

    function reedemReward(address token) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Do Not Exists");

        uint256 rewardAmount = getRewardEarned(token, msg.sender);
        require(rewardAmount > 0, "No rewards Found");

        IStakingPool(pool).reedemReward(msg.sender);
    }

    /// wrap
    function stakeETH(uint256 _amount) public payable {
        require(msg.value == _amount, "Incorrect Amount sent");

        IXDC(WEXDC).deposit{value: msg.value}();
        TransferHelper.safeTransfer(WEXDC, msg.sender, _amount);

        stake(WEXDC, _amount);
    }

    /// unWrap
    function withdrawETH(uint256 _amount) public {
        withdraw(WEXDC, _amount);

        TransferHelper.safeTransferFrom(
            WEXDC,
            msg.sender,
            address(this),
            _amount
        );

        IXDC(WEXDC).withdraw(_amount);

        TransferHelper.safeTransferETH(msg.sender, _amount);
    }

    // reward in the rToken itslef
    function reedemRewardETH() public {
        reedemReward(WEXDC);
    }
}
