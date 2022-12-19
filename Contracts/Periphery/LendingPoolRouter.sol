// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../Core/interfaces/ILendingPool.sol";
import "../Core/interfaces/ILendingPoolFactory.sol";
import "../Other/interfaces/IERC20.sol";
import "../Other/interfaces/IXDC.sol";
import "./libraries/TransferHelper.sol";

// deposit
// withdraw
// borrow
// repay
// Fetch details of the pool - like Pool address ,

// get details for the user

contract LendingPoolRouter {
    address public immutable factory;
    address public immutable WEXDC;

    constructor(address _factory, address xdcWrapper) {
        factory = _factory;
        WEXDC = xdcWrapper;
    }

    function getPoolAddress(address token) public view returns (address pool) {
        pool = ILendingPoolFactory(factory).getPool(token);
    }

    function getBalance(address token) public view returns (uint256 balance) {
        balance = IERC20(token).balanceOf(msg.sender);
    }

    function createPool(address token) public {
        ILendingPoolFactory(factory).createPool(token);
    }

    /// repay Amount quote with interest
    function getRepayAmount(
        address token,
        address user,
        uint256 repayAmount
    ) public view returns (uint256 amount) {
        address pool = getPoolAddress(token);

        amount = ILendingPool(pool).calculateRepayAmount(user, repayAmount);
    }

    /// withdraw amount quote with interest
    function getWithdrawAmount(
        address token,
        address user,
        uint256 withdrawAmount
    ) public view returns (uint256 amount) {
        address pool = getPoolAddress(token);

        amount = ILendingPool(pool).calculateWithdrawAmount(
            user,
            withdrawAmount
        );
    }

    /// user SafeApprove , SafeTransfer , SafeTransferFrom from Transfer Helper

    /// done and working
    function depositToken(address token, uint256 amount) public {
        address pool = getPoolAddress(token);

        if (pool != address(0)) {
            /// Not sure of Approval
            // TransferHelper.safeApprove(token, pool, amount);
            ILendingPool(pool).deposit(amount, msg.sender);
        } else {
            createPool(token);
            pool = getPoolAddress(token);

            // TransferHelper.safeApprove(token, pool, amount);
            ILendingPool(pool).deposit(amount, msg.sender);
        }
    }

    /// done and working
    function withdrawToken(address token, uint256 amount) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        require(
            ILendingPool(pool).lendAmount(msg.sender).amount > 0,
            "No amount to withdraw"
        );
        ILendingPool(pool).withdraw(msg.sender, amount);
    }

    /// done and working
    function borrowToken(address token, uint256 amount) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        ILendingPool(pool).borrow(amount, msg.sender);
    }

    /// done and working
    function repayToken(address token, uint256 amount) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        uint256 totalAmount = getRepayAmount(token, msg.sender, amount);

        // TransferHelper.safeApprove(token, pool, totalAmount);
        ILendingPool(pool).repay(msg.sender, amount);
    }

    /// done and working
    function depositETH(uint256 amount) public payable {
        require(amount == msg.value, "Incorrect Amount");

        address pool = getPoolAddress(WEXDC);

        ///  XDC Wrapped and sent to the User
        IXDC(WEXDC).deposit{value: msg.value}();
        TransferHelper.safeTransfer(WEXDC, msg.sender, msg.value);

        if (pool != address(0)) {
            /// Not sure of Approval
            // TransferHelper.safeApprove(WEXDC, pool, amount);
            ILendingPool(pool).deposit(amount, msg.sender);
        } else {
            createPool(WEXDC);
            pool = getPoolAddress(WEXDC);

            // TransferHelper.safeApprove(WEXDC, pool, amount);
            ILendingPool(pool).deposit(amount, msg.sender);
        }
    }

    // done and working
    function withdrawETH(uint256 amount) public {
        address pool = getPoolAddress(WEXDC);
        require(pool != address(0), "Pool Does not exists");

        uint256 totalAmount = getWithdrawAmount(WEXDC, msg.sender, amount);
        ILendingPool(pool).withdraw(msg.sender, amount);

        // TransferHelper.safeApprove(WEXDC, address(this), totalAmount);
        IXDC(WEXDC).transferFrom(msg.sender, address(this), totalAmount);

        IXDC(WEXDC).withdraw(totalAmount);

        TransferHelper.safeTransferETH(msg.sender, amount);
    }

    // done and working
    function borrowETH(uint256 amount) public {
        address pool = getPoolAddress(WEXDC);
        require(pool != address(0), "Pool Does not exists");

        ILendingPool(pool).borrow(amount, msg.sender);

        IXDC(WEXDC).approve(address(this), amount);
        IXDC(WEXDC).transferFrom(msg.sender, address(this), amount);

        IXDC(WEXDC).withdraw(amount);

        TransferHelper.safeTransferETH(msg.sender, amount);
    }

    /// send ETH > repay Amount taking into time considerartion
    function repayETH(uint256 amount) public payable {
        address pool = getPoolAddress(WEXDC);
        require(pool != address(0), "Pool Does not exists");

        uint256 totalAmount = getRepayAmount(WEXDC, msg.sender, amount);

        require(msg.value >= totalAmount, "Incorrect amount sent");

        IXDC(WEXDC).deposit{value: totalAmount}();
        TransferHelper.safeTransfer(WEXDC, msg.sender, totalAmount);

        ILendingPool(pool).repay(msg.sender, amount);

        /// Extra ETH returned back to the user
        if (msg.value > totalAmount) {
            TransferHelper.safeTransferETH(msg.sender, msg.value - totalAmount);
        }
    }

    function getLendAmount(address token, address user)
        public
        view
        returns (uint256 amount)
    {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        amount = ILendingPool(pool).lendAmount(user).amount;
    }

    function getBorrowAmount(address token, address user)
        public
        view
        returns (uint256 amount)
    {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        amount = ILendingPool(pool).borrowAmount(user).amount;
    }
}
