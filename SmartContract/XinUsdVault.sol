// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

interface XinUSD {
    function addLiquidity(uint _amount) external view;
}

contract XinUSDVault is  Ownable {

    XinUSD ContractAddress;

    
    address public XinUSDAddress;

    function setXinUSDAddress(address _newXinUSDAddress) public onlyOwner {
        XinUSDAddress = _newXinUSDAddress;
        ContractAddress = XinUSD(_newXinUSDAddress);
    }


    
    function WithDraw(uint _amount) public payable onlyOwner {
        
        (bool os, ) = payable(owner()).call{value: _amount }("");
        require(os);
    }

    function addToLiquidity(uint _amount) public onlyOwner {
        ContractAddress.addLiquidity(_amount);
    }
}
