// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "github.com/provable-things/ethereum-api/contracts/solc-v0.8.x/provableAPI.sol";

contract Oracle is usingProvable {

    // The latest price of the asset
    uint256 public price;

    // The address of the oracle contract owner
    address public owner;

    // API key for CoinMarketCap
    string private API_KEY;

    // Event emitted when the price is updated
    event PriceUpdated(uint256 _price);

    constructor(string memory _API_KEY) {
        owner = msg.sender;
        API_KEY = _API_KEY;
    }

    // Updates the price of the asset
    function updatePrice(uint256 _price) public {
        // require(msg.sender == owner, "Only the contract owner can update the price");
        // require(_price > 0, "Price must be greater than zero");
"
        provable_query("URL", "json(https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=XDC&CMC_PRO_API_KEY=).data.XDC.quote.USD.price");

        price = _price;
        emit PriceUpdated(_price);
    }

    function _callback(bytes32 _id, )
}
