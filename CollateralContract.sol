// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// The Collateral contract represents a contract that holds a specific collateral asset.
// This contract can be used in conjunction with the SingleCollateralStablecoin contract
// to create a single collateral stablecoin.

// return the balance of  particular address from the balances mapping
interface ICollateral {
    function balanceOf(address account) external view returns (uint256);
}

contract Collateral {
  // The address of the contract owner.
  address public owner;

  // The total supply of the collateral asset.
  uint public totalSupply;

  // The balance of the collateral asset for each account.
  mapping(address => uint) public balances;

  // Events that are emitted when the collateral asset is transferred.
  event Transfer(address indexed _from, address indexed _to, uint _amount);

  // The constructor sets the contract owner and the total supply of the collateral asset.
  constructor(uint _totalSupply) {
    owner = msg.sender;
    totalSupply = _totalSupply;
    balances[owner] = totalSupply;
  }

  // The transfer function allows the owner to transfer the collateral asset to any account.
  function transfer(address _to, uint _amount) public {
    require(msg.sender == owner, "Only the owner can transfer the collateral asset.");
    require(_amount > 0, "Cannot transfer 0 or negative amount of the collateral asset.");
    require(balances[msg.sender] >= _amount, "Insufficient balance.");
    require(_to != address(0), "Cannot transfer to the zero address.");

    // Decrease the balance of the sender and increase the balance of the recipient.
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;

    emit Transfer(msg.sender, _to, _amount);
  }

    // The balanceOf function returns the balance of a particular account.
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}
