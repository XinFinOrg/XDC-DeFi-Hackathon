// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./XRC20/XRC20.sol";
import "./utils/State.sol";

contract XDUSDCore is XRC20, State {
    string public constant CONTRACT_NAME = "XDUSD";

    // ========== CONSTRUCTOR ==========
    constructor(string memory _name, string memory _symbol,address _associatedContract)
        XRC20(_name, _symbol)
        State(_associatedContract)
    {}

    function mint(address _caller, uint256 _amountToMint)
        external
        onlyAssociatedContract
        returns (bool)
    {
        _mint(_caller, _amountToMint);
        return true;
    }
}
