// state your license
/// SPDX-License-Identifier: MIT

// state the compiler you used.
pragma solidity 0.8.17;

// here is where you import any inherited contracts
import "./ERC4907.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// let it know "Contract" is Government(s) contract(s)
contract TransportNFT is ERC4907 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 public constant MAX_SUPPLY = 222;

// a constructor is something use only one time during 
// deployment and never again. this one lets the contract be named
  constructor() ERC4907("MyTransport", "TRANSPORT") {}

// this is where you let it know where to find your collection metadata
    function _baseURI() internal view virtual override returns (string memory) {
    return "ipfs://ipfs-address-here/";
    }


// here is your mint function. it is a pretty simple one that mints and
// transfers transfers to user address 
  function mint(address _to, uint32 _mintAmount, string memory _tokenURI) public payable {
    require (MAX_SUPPLY >= _tokenIds.current(), "You cannot mint anymore");
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);
  }
  
}
