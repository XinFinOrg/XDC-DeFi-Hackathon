// this is where you set your license
/// SPDX-License-Identifier: UNLICENSED

// add your compiler version
pragma solidity ^0.8.1;

// here is where we state the contracts we want to borrow or "inherit from"
// openzeppelin has a repository on github you can import so just point at the file
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// name your contract 
contract TransportNFT is ERC721Enumerable, Ownable {


// then we will need to add this struct to let it now where to // find the token or
// method of payment, and how much token it will cost

    struct TokenInfo {
        IERC20 paytoken;
        uint32 costvalue;
    }

// We then let it know Token info is an array [] and that can have 
// infinite vale because it is empty. Its is public, so it can be seen
// and the "AllowedPayment'

    TokenInfo[] public AllowedPayments;
 
 
 // let it know too use strings to call your variables, like base uri, they are public 
 // so they can be seen. Add how many are in your collection "max", your max mint ammout 
 // per user wallet, and how you want your collection to begin "paused" true or false
 
    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint32 public maxSupply = 222;
    uint32 public maxMintAmount = 1;
    bool public paused = false;
    
    
// a constructor is something that happens only 1 time (at the time of construction
// it is used here to name our contract. but has other uses

    constructor() ERC721("My Transport NFT", "TRANSPORT") {}


// funtions are used to to add operability. This one adds the currency we will allow
// users to purchase with by: letting it know how to use the info "IERC20", where to find
// the allowed token "_paytoken", its cost "_costvalue", that is is publicly viewable, that
// and that "only(the)Owner" is allowed to interact with this function.

    function addCurrency(IERC20 _paytoken, uint32 _costvalue) public onlyOwner {
        AllowedPayments.push(TokenInfo({
                paytoken: _paytoken,
                costvalue: _costvalue
            })
        );
    }

// this is where you let it know where to find your collection metadata
    function _baseURI() internal view virtual override returns (string memory) {
    return "ipfs://QmYPfXKPrSUn8r2FRuC5y5pJcrfUjDdS65FHVgCCPCiiLY/";
    }


// here we add a mint function that allows us to use all the diffrent tokens that we enter
// after we deploy the contract. It lets it know to mint to user "address" the "mint ammount"
// the token of choice, and that it is payable in the first line, you can then follow as it 
// reverifies the information, (what = what) it will require: a state "paused" which we can change
// as true or false after deployment, an ammount more than 0, the ammount to mint, and how many
// have been minted / are left in your collection

    function mint(address _to, uint32 _mintAmount, uint32 _pid) public payable {
        TokenInfo storage tokens = AllowedPayments[_pid];
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        uint32 cost;
        cost = tokens.costvalue;
        uint256 supply = totalSupply();
        require(!paused);
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);
                  
            if (msg.sender != owner()) {
            require(msg.value == cost * _mintAmount, "Insufficient funds.");
            }
            
            for (uint32 i = 1; i <= _mintAmount; i++) {
                paytoken.transferFrom(msg.sender, address(this), cost);
                _safeMint(_to, supply + i);
            }
        }


// this function is to call the owner balance, after deployment, at anytime to view token the
// balance of and any tokens used 
        function ownerWallet(address _owner) public view returns (uint256[] memory) {
            uint256 ownerTokenCount = balanceOf(_owner);
            uint256[] memory tokenIds = new uint256[](ownerTokenCount);
            for (uint256 i; i < ownerTokenCount; i++) {
                tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
            }
            return tokenIds;
        }
    
    // this function shows the exact token id, if it exists, and where it resides
        function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
            require(_exists(tokenId),"Nonexistent token");
                string memory currentBaseURI = _baseURI();
                return
                bytes(currentBaseURI).length > 0 
                ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
                : "";
        }

 // this allows you to change the ammount of NFTs a user can mint
        function setmaxMintAmount(uint32 _newmaxMintAmount) public onlyOwner() {
            maxMintAmount = _newmaxMintAmount;
        }

// this shows the base uri, and can be changed if needed after deployment
        function setBaseURI(string memory _newBaseURI) public onlyOwner() {
            baseURI = _newBaseURI;
        }
        
        function setBaseExtension(string memory _newBaseExtension) public onlyOwner() {
            baseExtension = _newBaseExtension;
        }
        
// this lets you pause your contract after deployment by allowing you to determine the state
// by bool. True for paused, false for not paused.
        function pause(bool _state) public onlyOwner() {
            paused = _state;
        }

// this is your withdraw function with a payout structure. It is for use by "OnlyOwner"
// we allowed for a second payout address for our charity
        function withdraw() public payable onlyOwner {
        /// This will pay the Community Wallet 60% of the initial sale.
        (bool hs, ) = payable(0xfA133DB2F7d904408AF94129260b4a6799777D54).call{value: address(this).balance * 20 / 100}("Community");
        require(hs);
        /// This will payout the project 40% of the contract balance for running capital / salaries.
        (bool os, ) = payable(owner()).call{value: address(this).balance}("Project");
        require(os);
        }
        
        function withdraw(uint32 _pid) public payable onlyOwner() {
            TokenInfo storage tokens = AllowedPayments[_pid];
            IERC20 paytoken;
            paytoken = tokens.paytoken;
            paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
        }

        }
       
