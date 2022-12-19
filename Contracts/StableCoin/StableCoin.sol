// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StableCoin is ERC20 {
    address private immutable router;

    constructor(address _router) ERC20("US Dollars X", "USDX") {
        router = _router;
    }

    modifier onlyRouter() {
        require(msg.sender == router, "Not Authorized");
        _;
    }

    function calculateAmount(uint256 price, uint256 USDXAmount)
        public
        view
        returns (uint256 amount)
    {
        amount = price * USDXAmount;
    }

    function mint(uint256 amount, address to) public onlyRouter {
        _mint(to, amount);
    }

    /// mint tokens when the user deposits 1 USD equivalent amount of XDC
    ///@param -  1USD  = price*(XDC Coin)
    function mintUSDX(
        address user,
        uint256 price,
        uint256 USDXAmount
    ) public payable onlyRouter {
        uint256 totalAmountIn = price * USDXAmount;

        require(msg.value >= totalAmountIn, "Incorrect XDC Amount sent");

        _mint(user, USDXAmount);
    }

    /// Burn tokens when the user sends a token and Send 1 USD equivalent amount of XDC
    function burnUSDX(
        address user,
        uint256 price,
        uint3256 USDXAmount
    ) public onlyRouter {
        uint256 totalAmountOut = price * USDXAmount;

        require(balanceOf(user) > USDXAmount, "Low balance");

        transferFrom(user, address(this), USDXAmount);

        (bool success, ) = msg.sender.call{value: totalAmountOut}("");
        require(success, "Withdraw not completed");
    }
}
