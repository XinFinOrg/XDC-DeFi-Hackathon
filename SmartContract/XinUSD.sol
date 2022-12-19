// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract XinUSD is ERC20, Ownable {

    bytes32 public DOMAIN_SEPARATOR;

    constructor() ERC20("XinUSD", "XinUSD") {

        DOMAIN_SEPARATOR = keccak256(abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("XinUSD")),
                keccak256(bytes("1")),
                address(this)
            ));
    }

    mapping(address => uint) public liquidity;
    address public backedByToken;
    address payable public VaultAddress;

    event liquidityAdded(
        address _from,
        uint _amount
    );

    event liquidityRemoved(
        address _from,
        uint _amount
    );


        // Need approval for the contract address to deposite the token.
        // Approve(Address(this)
        // will mint the tokens only after the user have sufficient liquidity. Amount must be in reatio of 1:2, as of now taken care from front,end
        
    function mint(uint _amount) public {
        
        IERC20 token = IERC20(backedByToken); // WXDC contract Address
        require(token.transferFrom(msg.sender, address(this), _amount ), "Unable to Deposite");
        require(liquidity[msg.sender] >=  _amount);

        _mint(msg.sender, _amount);
    }


    function setVaultAddress(address payable _newVaultAddress) public onlyOwner {
        VaultAddress = _newVaultAddress;
    }

    function setBackedByToken(address  _newBackedByToken) public onlyOwner {
        backedByToken = _newBackedByToken;
    }

    function addLiquidity(uint _amount) public {
        IERC20 token = IERC20(backedByToken); // WXDC contract Address
        require(token.transferFrom(msg.sender, address(this), _amount ), "Unable to Deposite");
        
        liquidity[msg.sender] += _amount;
        emit liquidityAdded(msg.sender, _amount);
    }

    function removeLiquidity(uint _amount) public {
        IERC20 token = IERC20(backedByToken); // WXDC contract Address
        require(liquidity[msg.sender] >= _amount , "Insufficient Balance");

        liquidity[msg.sender] -= _amount;
        require(token.transferFrom(msg.sender, VaultAddress, _amount  *  1 / 100 ), "Unable to Deposite"); // Fee to the VaultAddress
        require(token.transferFrom(address(this), msg.sender, _amount *  99 / 100), "Unable to Withdraw"); // Returning user's stacked token.

        _burn(msg.sender, _amount);

        emit liquidityRemoved(msg.sender, _amount);
    }


    // function burnTokes(uint _amount) internal {
        
    //     IERC20 token = IERC20(backedByTokencke);
    //     require(token.transferFrom(msg.sender, VaultAddress, _amount  *  1 / 100 ), "Unable to Deposite");
    //     require( balanceOf(msg.sender) >= _amount, "Insufficient funds" );
    //     payable(msg.sender).transfer( balanceOf(msg.sender) );
    //     _burn(msg.sender, _amount);
    // }


}