// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IExchangeRate.sol";
import "./interfaces/IXsynExec.sol";
import "./interfaces/IXsynProtocol.sol";
import "./interfaces/IXDUSDCore.sol";
import "./AddressResolver.sol";
import "./utils/Constants.sol";
import "./utils/SafeDecimalMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract XSynExchange is Constants, AddressResolver {
    using SafeMath for uint256;
    using SafeDecimalMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public constant CONTRACTNAME = "XSynExchange";
    string internal constant CONTRACT_XSYNPROTOCOL = "XSynProtocol";
    string internal constant CONTRACT_XDUSD = "XDUSD";
    string internal constant CONTRACT_EXCHANGERATE = "EXCHANGERATE";

    mapping(address => uint256) public mintr;
    address public contractOwner;
    uint256 public minimumXDUSDDepositAmount = 1 ether;

    mapping(string => address) public supportedAddress;

    struct SupportTokens {
        uint256 _tokenId;
        string Symbol;
        string woPrefix;
        uint256 currentprice;
        address TokenAddress;
    }
    mapping(uint256 => SupportTokens) private idToTokens;

    /* Stores Exhanges from users. */
    struct ExchangeEntry {
        // The user that made the exchange
        address user;
        uint256 xdUsdDeposit;
        uint256 synthsExchanged;
        address currencyAddress;
        uint256 exchangedOn;
    }

    mapping(address => mapping(string => ExchangeEntry)) public exchanges;

    constructor() {
        contractOwner = msg.sender;
        _tokenIds.increment();
    }

    function showBalances(string memory _symbol) public view returns (uint256) {
        return XsynAssets(_symbol).balanceOf(msg.sender);
    }

    function fetchPrices() public view returns (SupportTokens[] memory) {
        uint256 itemCount = _tokenIds.current().sub(1);
        uint256 currentIndex = 0;
        SupportTokens[] memory items = new SupportTokens[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            SupportTokens storage currentItem = idToTokens[currentId];
            items[currentIndex] = currentItem;
            items[currentIndex].currentprice = ExchangeRate().showCurrentPrice(
                currentItem.woPrefix
            );
            currentIndex += 1;
        }
        return items;
    }

    function updateSupportedTokens(
        string memory _name,
        string memory _woPrefix,
        address _destination
    ) external onlyAuthorized {
        uint256 itemId = _tokenIds.current();
        _tokenIds.increment();
        idToTokens[itemId] = SupportTokens(
            itemId,
            _name,
            _woPrefix,
            0,
            _destination
        );
        supportedAddress[_name] = _destination;
    }

    /* ========== MODIFIERS ========== */

    modifier onlyAuthorized() {
        require(
            msg.sender == contractOwner,
            "XSynExchange: Only Authorized Wallet can perfor this operation"
        );
        _;
    }

    function calculateUnits(uint256 _units, string memory _symbol)
        public
        view
        returns (
            uint256 // Returns the number of Synths (sUSD) Minted
        )
    {
        uint256 _currentPrice = ExchangeRate().showCurrentPrice(_symbol);
        uint256 _actual = _units.div(_currentPrice);
        uint256 _toMint = _actual.mul(10000);
        return _toMint;
    }

    function setMinDepositForXDUSD(uint256 _minDeposit)
        external
        onlyAuthorized
    {
        minimumXDUSDDepositAmount = _minDeposit;
        emit MinimumDepositAmountUpdated(minimumXDUSDDepositAmount);
    }

    /**
     * @notice Exchange XDC to xdUSD.
     */
    /* solhint-disable multiple-sends, reentrancy */
    function exchangeXDUSDForSynths(
        uint256 _amount,
        address _preferredSynthAddress,
        string memory _woprefixSynth,
        string memory _wprefixSynth
    ) public returns (uint256) {
        require(
            _amount >= minimumXDUSDDepositAmount,
            "XDUSD amount Should be minimumXDUSDDepositAmount limit"
        );

        XRC20Balance(msg.sender, supportedAddress[CONTRACT_XDUSD], _amount);
        XRC20Allowance(msg.sender, supportedAddress[CONTRACT_XDUSD], _amount);
        uint256 synthsToMint = calculateUnits(_amount, _woprefixSynth);
        transferFundsToContract(_amount, supportedAddress[CONTRACT_XDUSD]);
        return
            _exchangeXDUSDForSynths(
                synthsToMint,
                _amount,
                _preferredSynthAddress,
                _wprefixSynth,
                _woprefixSynth
            );
    }

    function _exchangeXDUSDForSynths(
        uint256 _synthsToMint,
        uint256 _xdusdAmt,
        address _preferredSynthAddress,
        string memory _wprefixSynth,
        string memory _woprefixSynth
    ) internal returns (uint256) {
        ExchangeEntry memory exchange = exchanges[msg.sender][_wprefixSynth];
        uint256 _xdUsdNewBalance = exchange.xdUsdDeposit.add(_xdusdAmt);
        uint256 _synthsNewBalance = exchange.synthsExchanged.add(_synthsToMint);
        // add a row in deposit entry and sum up the total value deposited so far
        exchanges[msg.sender][_wprefixSynth] = ExchangeEntry(
            msg.sender,
            _xdUsdNewBalance,
            _synthsNewBalance,
            _preferredSynthAddress,
            block.timestamp
        );
        //mint respective Synthetix for the amount of XDC they staked
        XsynAssets(_wprefixSynth).mint(msg.sender, _synthsToMint);
        // XSynProtocol().updateDebtPoolSynth(
        //     msg.sender,
        //     _xdusdAmt,
        //     _synthsToMint,
        //     _wprefixSynth
        // );
        // XSynProtocol().updateDebtPoolXDUSD(msg.sender, _xdusdAmt);
        emit updatedebt(msg.sender, _xdusdAmt, _synthsToMint, _woprefixSynth);
        return _synthsToMint;
    }

    function XsynAssets(string memory _Symbol)
        internal
        view
        returns (IXsynExec)
    {
        return IXsynExec(supportedAddress[_Symbol]);
    }

    function ExchangeRate() internal view returns (IExchangeRate) {
        return IExchangeRate(supportedAddress[CONTRACT_EXCHANGERATE]);
    }

    function XDUSDCore() internal view returns (IXDUSDCore) {
        return IXDUSDCore(supportedAddress[CONTRACT_XDUSD]);
    }

    function XSynProtocol() internal view returns (IXsynProtocol) {
        return IXsynProtocol(supportedAddress[CONTRACT_XSYNPROTOCOL]);
    }

    function XRC20Balance(
        address _addrToCheck,
        address _currency,
        uint256 _AmountToCheckAgainst
    ) internal view {
        require(
            IERC20(_currency).balanceOf(_addrToCheck) >= _AmountToCheckAgainst,
            "XRC20Gateway: insufficient currency balance"
        );
    }

    function XRC20Allowance(
        address _addrToCheck,
        address _currency,
        uint256 _AmountToCheckAgainst
    ) internal view {
        require(
            IERC20(_currency).allowance(_addrToCheck, address(this)) >=
                _AmountToCheckAgainst,
            "XRC20Gateway: insufficient allowance."
        );
    }

    //internal function for transferpayment
    function transferFundsToContract(uint256 _amount, address _tokenaddress)
        internal
    {
        IERC20(_tokenaddress).transferFrom(msg.sender, address(this), _amount);
    }

    /* ========== EVENTS ========== */
    event MinimumDepositAmountUpdated(uint256 amount);
    event updatedebt(
        address _user,
        uint256 _xdusdAmt,
        uint256 _synthsToMint,
        string _wprefixSynth
    );
}
