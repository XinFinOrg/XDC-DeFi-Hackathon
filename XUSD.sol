// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// The SingleCollateralStablecoin contract represents a single collateral stablecoin,
// which is a type of cryptocurrency that is pegged to a specific asset and is intended
// to maintain a stable value relative to that asset.

contract SingleCollateralStablecoin {
  // The address of the contract owner.
  address public owner;

  // The address of the contract that holds the collateral asset.
  address public collateralContract;

  // The ratio of stablecoins to collateral. For example, if the ratio is 100,
  // then for every 1 unit of collateral, 100 stablecoins can be issued.
  uint public collateralRatio;

  // The total supply of stablecoins that have been issued.
  uint public totalSupply;

  // The balance of stablecoins for each account.
  mapping(address => uint) public balances;

  // Events that are emitted when stablecoins are issued or redeemed.
  event Issued(address _to, uint _amount);
  event Redeemed(address _from, uint _amount);

  // The constructor sets the contract owner and the collateral contract.
  constructor(address _collateralContract) {
    owner = msg.sender;
    collateralContract = _collateralContract;
    
  }

  // The issue function allows the owner to issue new stablecoins in exchange for collateral.
  function issue(uint _amount) public {
    require(msg.sender == owner, "Only the owner can issue stablecoins.");
    require(_amount > 0, "Cannot issue 0 or negative amount of stablecoins.");

    // Check that there is enough collateral to cover the issuance of stablecoins.
    require(collateralContract.balanceOf(msg.sender) >= _amount * collateralRatio, "Insufficient collateral.");

    // Increase the total supply and the balance of the caller.
    totalSupply += _amount;
    balances[msg.sender] += _amount;

    emit Issued(msg.sender, _amount);
  }

  // The redeem function allows any account to redeem their stablecoins for collateral.
  function redeem(uint _amount) public {
    require(_amount > 0, "Cannot redeem 0 or negative amount of stablecoins.");
    require(balances[msg.sender] >= _amount, "Insufficient balance.");

    // Decrease the total supply and the balance of the caller.
    totalSupply -= _amount;
    balances[msg.sender] -= _amount;

    // Transfer the collateral to the caller.
    collateralContract.transfer(_amount * collateralRatio);

    emit Redeemed(msg.sender, _amount);
  }

  function dilute(address _user) public {
    require(msg.sender == owner, "Only the owner can dilute a user's stablecoins.");

    // Check the user's collateral balance.
    uint collateralBalance = collateralContract.balanceOf(_user);

    // Calculate the maximum number of stablecoins that the user can have based on their collateral balance.
    uint maxStablecoins = collateralBalance / collateralRatio;

    // If the user's stablecoin balance exceeds the maximum allowed based on their collateral balance, redeem the excess stablecoins.
    if (balances[_user] > maxStablecoins) {
      uint excessStablecoins = balances[_user] - maxStablecoins;
      balances[_user] -= excessStablecoins;
      totalSupply -= excessStablecoins;

      // Transfer the collateral to the owner.
      collateralContract.transfer(excessStablecoins * collateralRatio, owner);

      emit Redeemed(_user, excessStablecoins);
    }
  }
}
