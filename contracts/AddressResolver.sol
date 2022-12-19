// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)
pragma solidity ^0.8.0;

contract AddressResolver {
    string public constant CONTRACT_NAME = "AddressResolver";
    mapping(bytes32 => address) public addressCache;
    address public _owner;

    constructor() {
        _owner = msg.sender;
    }

    function updateCache(bytes32  _name, address _destination) public {
        require(_owner == msg.sender, "only owner can update");
        addressCache[_name] = _destination;
        emit CacheUpdated(_name, _destination);
    }

    event CacheUpdated(bytes32 name, address destination);

    function requireAndGetAddress(bytes32 _name)
        public
        view
        returns (address)
    {
        address _foundAddress = addressCache[_name];
        require(
            _foundAddress != address(0),
            string(abi.encodePacked("Missing address: ", _name))
        );
        return _foundAddress;
    }

    function fetchAddress(bytes32  _name)
        public
        view
        returns (address)
    {
        address _foundAddress = addressCache[_name];
        require(
            _foundAddress != address(0),
            string(abi.encodePacked("Missing address: ", _name))
        );
        return _foundAddress;
    }

    function isRequireAndGetAddress(bytes32 _name)
        internal
        view
        returns (bool)
    {
        address _foundAddress = addressCache[_name];
        if (_foundAddress != address(0)) {
            return true;
        } else {
            return false;
        }
    }
}
