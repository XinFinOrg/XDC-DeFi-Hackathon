// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XDCS is ERC20Capped, Ownable{
    constructor(uint256 cap) ERC20("XDCSwap Token", "XDCS") ERC20Capped(cap){
    }

    function issueToken(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount*10**18);
    }
}