// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IXsynProtocol {
    function updateDebtPoolSynth(address _user,uint256 _totUsdSwapped,uint256 _totSynthsPurchased,string memory _symbolPurchased) external;
    function updateDebtPoolXDUSD(address _user,uint256 _totUsdSwapped) external;
}
