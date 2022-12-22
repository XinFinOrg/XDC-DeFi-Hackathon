// in this contract we want to 1) withdraw
// funds 2) set a minimum value in USD(T)

/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PublicGoodsFund is Ownable {

function donate() public payable{
   // make sure they actually submit a donation
   require(msg.value > 0, "Insufficient Funding"); 
   }

// this withdraw function has a secure payout structure that is only for use by "OnlyOwner"
// we added a second payout address for charity / donations to Public Goods Fund
        function withdraw() public payable onlyOwner {
        /// This will donate 10% of all donations to Optimism. ((In theory, it is currently set to the 
        // Optimism "Contract" we will change this before we deploy on mainnet, we need to
        // obtain an address for donating to pblic goods funds from Optimism.
        (bool hs, ) = payable(0x4200000000000000000000000000000000000042).call{value: address(this).balance * 10 / 100}("Optimism");
        require(hs);
        /// This will send the Community Donation Wallet the remaining 90% of all donations for
        // distrubution to community chosen charity
        (bool os, ) = payable(0xfA133DB2F7d904408AF94129260b4a6799777D54).call{value: address(this).balance}("Charity");
        require(os);
        }

}
