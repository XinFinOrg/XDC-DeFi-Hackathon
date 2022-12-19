// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface ILendingPool {
    struct Amount {
        uint256 amount;
        uint256 start;
    }

    function lendAmount(address user) external view returns (Amount memory);

    function earnedInterest(address user) external view returns (uint256);

    function borrowAmount(address user) external view returns (Amount memory);

    function payInterest(address user) external view returns (uint256);

    function lenders(address user) external view returns (bool);

    function borrowers(address user) external view returns (bool);

    function deposit(uint256 _amount, address user) external;

    function borrow(uint256 _amount, address user) external;

    function repay(address user, uint256 amount) external;

    function withdraw(address user, uint256 amount) external;

    function liquidate(address user, uint256 amount) external;

    function calculateRepayAmount(address user, uint256 amount)
        external
        view
        returns (uint256);

    function calculateWithdrawAmount(address user, uint256 amount)
        external
        view
        returns (uint256);
}
