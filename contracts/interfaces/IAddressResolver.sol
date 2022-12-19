

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

interface IAddressResolver {
    function getAddress(bytes32 name) external view returns (address);
    function requireAndGetAddress(bytes32 name, string calldata reason) external view returns (address);
}
