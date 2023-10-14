// in this contract we want to 1) withdraw
// funds 2) set a minimum value in USD(T)

/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Redeem is Ownable {

function redeem() public payable{
   // make sure they actually submit 100
   require(msg.value > 100, "Insufficient Funding");
   }
}
