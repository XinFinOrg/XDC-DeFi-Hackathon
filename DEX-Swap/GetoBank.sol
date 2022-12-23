pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract GetoBank is ERC20("GetoBank", "xSUSHI"){
    using SafeMath for uint256;
    IERC20 public geto;

    constructor(IERC20 _geto) public {
        geto = _geto;
    }

    // Enter the bank. Pay some SUSHIs. Earn some shares.
    function enter(uint256 _amount) public {
        uint256 totalSushi = geto.balanceOf(address(this));
        uint256 totalShares = totalSupply();
        if (totalShares == 0 || totalSushi == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 what = _amount.mul(totalShares).div(totalSushi);
            _mint(msg.sender, what);
        }
        geto.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bank. Claim back your SUSHIs.
    function leave(uint256 _share) public {
        uint256 totalShares = totalSupply();
        uint256 what = _share.mul(geto.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        geto.transfer(msg.sender, what);
    }
}