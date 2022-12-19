// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Only the bridge manager can call the function here , which will be approved by the users

contract WETH is ERC20, Ownable {
    address public approved;

    constructor() ERC20("Wrapped Ether", "WETH") {}

    modifier onlyApproved() {
        require(msg.sender == approved, "Not Authorised");
        _;
    }

    function mint(address to, uint256 amount) public onlyApproved {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) public onlyApproved {
        _burn(to, amount);
    }

    function setApproved(address _approved) public onlyOwner {
        approved = _approved;
    }
}
