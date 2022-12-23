// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    using SafeERC20 for IERC20;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    IERC20 public immutable rewardsToken = ERC20(0x8f7116CA03AEB48547d0E2EdD3Faa73bfB232538);

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    event TransferSent (
      address sender,
      address to,
      uint amount
    );

    event PersonalItemCreated(
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    struct StakedToken {
      address staker;
      uint256 tokenId;
    }

    // Staker info
    struct Staker {
      // Amount of tokens staked by the staker
      uint256 amountStaked;

      // Staked token ids
      StakedToken[] stakedTokens;

      // Last time of the rewards were calculated for this user
      uint256 timeOfLastUpdate;

      // Calculated, but unclaimed rewards for the User. The rewards are
      // calculated each time the user writes to the Smart Contract
      uint256 unclaimedRewards;
    }

    // Rewards per hour per token deposited in wei.
    uint256 private rewardsPerHour = 1000;

    // Mapping of User Address to Staker info
    mapping(address => Staker) public stakers;

    // Mapping of Token Id to staker. Made for the SC to remeber
    // who to send back the ERC721 Token to.
    mapping(uint256 => address) public stakerAddress;

    constructor() ERC721("Metaverse Tokens", "METT") {
      owner = payable(msg.sender);
    }

    function getCurrentTokenId() public view returns (uint) {
      return _tokenIds.current();
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

    /* Returns the listing price of the contract */
    function tokenID() public view returns (uint256) {
      return _tokenIds.current();
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, price);
      return newTokenId;
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price
    ) private {
      require(price > 0, "Price must be at least 1 wei");
      require(msg.value == listingPrice, "Price must be equal to listing price");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        false
      );
    }

    function createPersonalToken(string memory tokenURI, uint256 price) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createPersonalItem(newTokenId, price);
      return newTokenId;
    }

    function createPersonalItem(
      uint256 tokenId,
      uint256 price
    ) private {
      require(price > 0, "Price must be at least 1 wei");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
      );

      _transfer(msg.sender, address(this), tokenId);

      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      emit PersonalItemCreated(
        tokenId,
        address(this),
        msg.sender,
        price,
        true
      );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(msg.value == listingPrice, "Price must be equal to listing price");
      idToMarketItem[tokenId].sold = false;
      idToMarketItem[tokenId].price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
      uint256 tokenId
      ) public payable {
      uint price = idToMarketItem[tokenId].price;
     require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      payable(owner).transfer(listingPrice);
      payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    function getOwner(uint tokenId) public view returns (address) {
      return idToMarketItem[tokenId].owner;
    }

    function getPrice(uint tokenId) public view returns (uint) {
      return idToMarketItem[tokenId].price;
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    // Calculate rewards for param _staker by calculating the time passed
    // since last update in hours and mulitplying it to ERC721 Tokens Staked
    // and rewardsPerHour.
    function calculateRewards(address _staker) internal view returns (uint256 _rewards)
    {
      return (((
          ((block.timestamp - stakers[_staker].timeOfLastUpdate) *
              stakers[_staker].amountStaked)
      ) * rewardsPerHour) / 3600);
    }

    // If address already has ERC721 Token/s staked, calculate the rewards.
    // Increment the amountStaked and map msg.sender to the Token Id of the staked
    // Token to later send back on withdrawal. Finally give timeOfLastUpdate the
    // value of now.
    function stake(uint256 _tokenId) external nonReentrant {
      // If wallet has tokens staked, calculate the rewards before adding the new token
      if (stakers[msg.sender].amountStaked > 0) {
          uint256 rewards = calculateRewards(msg.sender);
          stakers[msg.sender].unclaimedRewards += rewards;
      }

      // Wallet must own the token they are trying to stake
      require(
        idToMarketItem[_tokenId].owner == msg.sender,
        "You don't own this token!"
      );

      // Transfer the token from the wallet to the Smart contract
      _transfer(msg.sender, address(this), _tokenId);

      // Create StakedToken
      StakedToken memory stakedToken = StakedToken(msg.sender, _tokenId);

      // Add the token to the stakedTokens array
      stakers[msg.sender].stakedTokens.push(stakedToken);

      // Increment the amount staked for this wallet
      stakers[msg.sender].amountStaked++;

      // Update the mapping of the tokenId to the staker's address
      stakerAddress[_tokenId] = msg.sender;

      idToMarketItem[_tokenId].owner = payable(address(0));

      // Update the timeOfLastUpdate for the staker   
      stakers[msg.sender].timeOfLastUpdate = block.timestamp;
    }

    function getZeroAdrress() public pure returns (address) {
      return address(0);
    }

    // Check if user has any ERC721 Tokens Staked and if they tried to withdraw,
    // calculate the rewards and store them in the unclaimedRewards
    // decrement the amountStaked of the user and transfer the ERC721 token back to them
    function withdraw(uint256 _tokenId) external nonReentrant {
      // Make sure the user has at least one token staked before withdrawing
      require(
        stakers[msg.sender].amountStaked > 0,
        "You have no tokens staked"
      );
      
      // Wallet must own the token they are trying to withdraw
      require(stakerAddress[_tokenId] == msg.sender, "You don't own this token!");

      // Update the rewards for this user, as the amount of rewards decreases with less tokens.
      uint256 rewards = calculateRewards(msg.sender);
      stakers[msg.sender].unclaimedRewards += rewards;

      // Find the index of this token id in the stakedTokens array
      uint256 index = 0;
      for (uint256 i = 0; i < stakers[msg.sender].stakedTokens.length; i++) {
        if (
          stakers[msg.sender].stakedTokens[i].tokenId == _tokenId 
          && 
          stakers[msg.sender].stakedTokens[i].staker != address(0)
        ) {
          index = i;
          break;
        }
      }

      // Set this token's .staker to be address 0 to mark it as no longer staked
      stakers[msg.sender].stakedTokens[index].staker = address(0);

      // Decrement the amount staked for this wallet
      stakers[msg.sender].amountStaked--;

      // Update the mapping of the tokenId to the be address(0) to indicate that the token is no longer staked
      stakerAddress[_tokenId] = address(0);

      idToMarketItem[_tokenId].owner = payable(msg.sender);

      // Transfer the token back to the withdrawer
      _transfer(address(this), msg.sender, _tokenId);

      // Update the timeOfLastUpdate for the withdrawer   
      stakers[msg.sender].timeOfLastUpdate = block.timestamp;
    }

    // Calculate rewards for the msg.sender, check if there are any rewards
    // claim, set unclaimedRewards to 0 and transfer the ERC20 Reward token
    // to the user.
    function claimRewards() external {
      uint256 rewards = calculateRewards(msg.sender) + stakers[msg.sender].unclaimedRewards;
      require(rewards > 0, "You have no rewards to claim");
      stakers[msg.sender].timeOfLastUpdate = block.timestamp;
      stakers[msg.sender].unclaimedRewards = 0;
      _transferERC20(rewardsToken, msg.sender, rewards);
    }

    function _transferERC20(IERC20 token, address to, uint256 amount)  internal {
      require(msg.sender == owner, "Only owner can withdraw funds"); 
      uint256 erc20balance = token.balanceOf(address(this));
      require(amount <= erc20balance, "balance is low");
      token.transfer(to, amount);
      emit TransferSent(msg.sender, to, amount);
    }

    function availableRewards(address _staker) public view returns (uint256) {
      uint256 rewards = calculateRewards(_staker) + stakers[_staker].unclaimedRewards;
      return rewards;
    }

    function getStakedTokens(address _user) public view returns (StakedToken[] memory) {
      // Check if we know this user
      if (stakers[_user].amountStaked > 0) {
        // Return all the tokens in the stakedToken Array for this user that are not -1
        StakedToken[] memory _stakedTokens = new StakedToken[](stakers[_user].amountStaked);
        uint256 _index = 0;

        for (uint256 j = 0; j < stakers[_user].stakedTokens.length; j++) {
            if (stakers[_user].stakedTokens[j].staker != (address(0))) {
              _stakedTokens[_index] = stakers[_user].stakedTokens[j];
              _index++;
            }
        }

        return _stakedTokens;
      }
      
      // Otherwise, return empty array
      else {
        return new StakedToken[](0);
      }
    }

}