// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WXDC is ERC20 {
    constructor() ERC20("Wrapped XDC", "WXDC") {}

    function mint() public payable  {
        require(msg.value >= 0, "Value should not be");
        _mint(msg.sender, msg.value);
    }

    function burnTokes(uint _amount) public  {
        require( balanceOf(msg.sender)>= _amount, "Insufficient funds" );
        payable(msg.sender).transfer(_amount);
        _burn(msg.sender, _amount);

    }

}
