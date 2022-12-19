// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WXDC is ERC20 {
    event Deposit(address indexed account, uint256 _amount);
    event Withdrawl(address indexed account, uint256 _amount);

    constructor() ERC20("Wrapped XDC", "WXDC") {}

    /// @dev Function to deposit ETH and mint Wrapped ether
    function deposit() external payable {
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    /// to withdraw the ether wrapped and burn the tokens
    function withdraw(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Amount is invalid");
        _burn(msg.sender, amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdraw not completed");
        emit Withdrawl(msg.sender, amount);
    }

    /// @dev Function to receive Ether. msg.data must be empty
    receive() external payable {
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    /// @dev Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
