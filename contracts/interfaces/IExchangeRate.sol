

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;


interface IExchangeRate{
    function requestData(string calldata _Fsymbol,string calldata _tSymbol) external returns (bytes32 requestId);
    function showPrice(bytes32 _reqId) external view returns(uint256);
    function showCurrentPrice(string calldata _fsym) external view returns(uint256);
}
