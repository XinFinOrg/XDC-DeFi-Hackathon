


// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;


interface Constants {
    enum TokenType {
        XDC,
        PLI
    }
    enum Status {
        APPROVED,
        INACTIVE,
        PENDING,
        REGISTERED,
        ACTIVE
    }
}