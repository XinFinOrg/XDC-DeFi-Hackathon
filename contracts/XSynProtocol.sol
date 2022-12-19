// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IExchangeRate.sol";
import "./interfaces/IXDUSDCore.sol";
import "./AddressResolver.sol";
import "./utils/Constants.sol";
import "./utils/SafeDecimalMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract XSynProtocol is Constants, AddressResolver {
    using SafeMath for uint256;
    using SafeDecimalMath for uint256;

    string public constant CONTRACTNAME = "XSynProtocol";
    string internal constant CONTRACT_XDUSDCORE = "XDUSD";
    string internal constant CONTRACT_EXCHANGERATE = "EXCHANGERATE";
    string internal constant CONTRACT_XSYNEXCHANGE = "XSynExchange";

    uint128 private constant MAX_BPS = 1_00;

    uint256 public minCRatio;

    // mapping(address => uint256) public mintr;
    address public contractOwner;

    mapping(string => address) public keyaddress;

    uint256 public minimumXDCDepositAmount = 100 ether;
    uint256 public minimumPLIDepositAmount = 100 ether;

    /* Stores deposits from users. */
    struct DepositEntry {
        // The user that made the deposit
        address payable user;
        // The amount (in xdc / pli) that they deposited
        uint256 xdcDeposit;
        uint256 pliDeposit;
        uint256 xdUsdminted;
        // type of (coin/token) that they deposited
        TokenType tok;
    }

    mapping(address => uint256) public totalXDUSDMinted;
    mapping(address => uint256) public totalXDUSDSwapped;

    //DebtPool will track the swaps and the trading
    struct DebtPool {
        address user;
        string xSynSymbol;
        uint256 synthValue;
        uint256 totXDSwapped;
        bool isXDUSD;
        bool isMinted;
        bool isSwapped;
    }

    mapping(address => DepositEntry) public deposits;
    mapping(address => mapping(string => DebtPool)) public debtTotalPool;
    mapping(address => DebtPool[]) public tradingPool;

    constructor(uint256 cratio) {
        contractOwner = msg.sender;
        minCRatio = uint64(cratio);
    }

    /**
     * @notice Fallback function
     */
    receive() external payable {}

    function setMinDepositForXDC(uint256 _minDeposit) external onlyAuthorized {
        minimumXDCDepositAmount = _minDeposit;
        emit MinimumDepositAmountUpdated(minimumXDCDepositAmount);
    }

    function setMinDepositForPLI(uint256 _minDeposit) external onlyAuthorized {
        minimumPLIDepositAmount = _minDeposit;
        emit MinimumDepositAmountUpdated(minimumPLIDepositAmount);
    }

    function updateKeyAddress(string memory _name, address _destination)
        external
        onlyAuthorized
    {
        keyaddress[_name] = _destination;
    }

    function _onlyAuthorized() internal view {
        require(
            msg.sender == contractOwner,
            "Only XSynProtocol can perform this operation"
        );
    }

    modifier onlyAuthorized() {
        _onlyAuthorized();
        _;
    }

    function _onlyExchanger() internal view {
        require(
            msg.sender == XsynExchanger(),
            "Only XsynExchange can perform this operation"
        );
    }

    modifier onlyExchanger() {
        _onlyExchanger();
        _;
    }

    function calculateWithoutCratio(uint256 _units, string memory _symbol)
        internal
        view
        returns (
            uint256 // Returns the number of Synths (xdusd) Minted
        )
    {
        uint256 _currentPrice = ExchangeRate().showCurrentPrice(_symbol);
        uint256 _xdusdActual = _units.mul(_currentPrice);
        return _xdusdActual / 10000;
    }

    function getEstimation(uint256 _units, string memory _symbol)
        public
        view
        returns (
            uint256 // Returns the number of Synths (Xdusd) Minted
        )
    {
        uint256 _currentPrice = ExchangeRate().showCurrentPrice(_symbol);
        uint256 _xdusdActual = _units.mul(_currentPrice);
        uint256 _totalTokenEligbleToMintAfterCRatio = (_xdusdActual /
            (minCRatio / MAX_BPS)) / 10000;

        return _totalTokenEligbleToMintAfterCRatio;
    }

    function calculateXDUSD(
        bool isXDC,
        uint256 _units,
        string memory _symbol
    )
        internal
        returns (
            uint256 // Returns the number of Synths (xdusd) Minted
        )
    {
        uint256 _xdusdActual;
        uint256 _currentPrice = ExchangeRate().showCurrentPrice(_symbol);

        if (isXDC) {
            _xdusdActual = msg.value.mul(_currentPrice);
        } else {
            _xdusdActual = _units.mul(_currentPrice);
        }
        uint256 _afterCollateralRatioApplied = (_xdusdActual /
            (minCRatio / MAX_BPS)) / 10000;

        emit calculatedRatio(
            _afterCollateralRatioApplied,
            _xdusdActual,
            _currentPrice
        );

        return _afterCollateralRatioApplied;
    }

    function showPrice(string memory _symbol) public view returns (uint256) {
        uint256 _tempprice = ExchangeRate().showCurrentPrice(_symbol);
        return _tempprice;
    }

    /**
     * @notice Exchange XDC to xdUSD.
     */
    /* solhint-disable multiple-sends, reentrancy */
    function mintxdUSDForXDC()
        external
        payable
        returns (
            uint256 // Returns the number of Synths (xdusd) Minted
        )
    {
        require(
            msg.value >= minimumXDCDepositAmount,
            "XDC amount Should be minimumXDCDepositAmount limit"
        );

        //Apply Cratio
        uint256 _afterCollateralRatioApplied = calculateXDUSD(true, 0, "XDC");

        totalXDUSDMinted[msg.sender] = totalXDUSDMinted[msg.sender].add(
            _afterCollateralRatioApplied
        );

        return _exchangeXdcForXDUSD(_afterCollateralRatioApplied);
    }

    function _exchangeXdcForXDUSD(uint256 _xdUSDToMintforXDC)
        internal
        returns (uint256)
    {
        require(
            msg.value >= minimumXDCDepositAmount,
            "XDC amount Should be minimumXDCDepositAmount limit"
        );

        //Deposit Entry
        DepositEntry memory deposit = deposits[msg.sender];
        uint256 newAmount = deposit.xdcDeposit.add(msg.value);
        uint256 _xdusdAmount = deposit.xdUsdminted.add(_xdUSDToMintforXDC);

        // add a row in deposit entry and sum up the total value deposited so far
        deposits[msg.sender] = DepositEntry(
            payable(msg.sender),
            newAmount,
            deposit.pliDeposit,
            _xdusdAmount,
            TokenType(0)
        );

        ///updating XDUSD debit
        DebtPool memory xdUSDDebtTotal = debtTotalPool[msg.sender]["XDUSD"];
        uint256 _xdusdSynthValue = xdUSDDebtTotal.synthValue.add(_xdusdAmount);

        debtTotalPool[msg.sender]["XDUSD"] = DebtPool(
            msg.sender,
            "XDUSD",
            _xdusdSynthValue,
            0,
            true,
            true,
            false
        );

        tradingPool[msg.sender].push(
            DebtPool(
                msg.sender,
                "XDUSD",
                _xdUSDToMintforXDC,
                0,
                true,
                true,
                false
            )
        );

        //mint XDUSD for the amount of XDC they staked
        XDUSDCore().mint(msg.sender, _xdUSDToMintforXDC);
        return _xdUSDToMintforXDC;
    }

    /**
     * @notice Exchange XDC to xdUSD.
     */
    /* solhint-disable multiple-sends, reentrancy */
    function mintxdUSDForPLI(uint256 _pliVal, address _tokenAddress)
        external
        returns (
            uint256 // Returns the number of Synths (xdusd) Minted
        )
    {
        require(
            _pliVal >= minimumPLIDepositAmount,
            "PLI amount Should be minimumPLIDepositAmount limit"
        );

        uint256 _afterCollateralRatioApplied = calculateXDUSD(
            false,
            _pliVal,
            "PLI"
        );

        //Total XDUSD Minted by User
        totalXDUSDMinted[msg.sender] = totalXDUSDMinted[msg.sender].add(
            _afterCollateralRatioApplied
        );

        XRC20Balance(msg.sender, _tokenAddress, _pliVal);
        XRC20Allowance(msg.sender, _tokenAddress, _pliVal);
        transferFundsToContract(_pliVal, _tokenAddress);
        return _exchangePliForXDUSD(_afterCollateralRatioApplied, _pliVal);
    }

    function _exchangePliForXDUSD(uint256 _xdUSDToMintforPli, uint256 _pli)
        internal
        returns (uint256)
    {
        require(
            _pli >= minimumPLIDepositAmount,
            "PLI amount Should be minimumPLIDepositAmount limit"
        );

        DepositEntry memory deposit = deposits[msg.sender];
        uint256 newAmount = deposit.pliDeposit.add(_pli);
        uint256 _xdusdAmount = deposit.xdUsdminted.add(_xdUSDToMintforPli);

        // add a row in deposit entry and sum up the total value deposited so far
        deposits[msg.sender] = DepositEntry(
            payable(msg.sender),
            deposit.xdcDeposit,
            newAmount,
            _xdusdAmount,
            TokenType(1)
        );

        ///updating XDUSD debit
        DebtPool memory xdUSDDebtTotal = debtTotalPool[msg.sender]["XDUSD"];
        uint256 _xdusdSynthValue = xdUSDDebtTotal.synthValue.add(_xdusdAmount);

        debtTotalPool[msg.sender]["XDUSD"] = DebtPool(
            msg.sender,
            "XDUSD",
            _xdusdSynthValue,
            0,
            true,
            true,
            false
        );

        tradingPool[msg.sender].push(
            DebtPool(msg.sender, "XDUSD", _xdusdAmount, 0, true, true, false)
        );

        //mint XDUSD for the amount of PLI they staked
        XDUSDCore().mint(msg.sender, _xdUSDToMintforPli);
        return _xdUSDToMintforPli;
    }

    function XDUSDCore() internal view returns (IXDUSDCore) {
        return IXDUSDCore(keyaddress[CONTRACT_XDUSDCORE]);
    }

    function ExchangeRate() internal view returns (IExchangeRate) {
        return IExchangeRate(keyaddress[CONTRACT_EXCHANGERATE]);
    }

    function XsynExchanger() internal view returns (address) {
        return address(keyaddress[CONTRACT_XSYNEXCHANGE]);
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

    function updateDebtPoolSynth(
        address _user,
        uint256 _totUsdSwapped,
        uint256 _totSynthsPurchased,
        string memory _symbolPurchased
    ) public returns (bool) {
        //updating Other synthetix debit
        DebtPool memory debtTotal = debtTotalPool[_user][_symbolPurchased];
        uint256 _synthValue = debtTotal.synthValue.add(_totSynthsPurchased);

        debtTotalPool[_user][_symbolPurchased] = DebtPool(
            _user,
            _symbolPurchased,
            _synthValue,
            _totUsdSwapped,
            false,
            false,
            true
        );

        tradingPool[_user].push(
            DebtPool(
                _user,
                _symbolPurchased,
                _totSynthsPurchased,
                _totUsdSwapped,
                false,
                false,
                true
            )
        );
        return true;
    }

    function updateDebtPoolXDUSD(address _user, uint256 _totUsdSwapped)
        public
        returns (bool)
    {
        ///updating XDUSD debit
        DebtPool memory xdUSDDebtTotal = debtTotalPool[_user]["XDUSD"];
        uint256 _xdusdSynthValue = xdUSDDebtTotal.synthValue.sub(
            _totUsdSwapped
        );
        debtTotalPool[_user]["XDUSD"] = DebtPool(
            _user,
            "XDUSD",
            _xdusdSynthValue,
            _totUsdSwapped,
            true,
            false,
            true
        );
        tradingPool[_user].push(
            DebtPool(
                _user,
                "XDUSD",
                _totUsdSwapped,
                _totUsdSwapped,
                true,
                false,
                true
            )
        );

        return true;
    }

    function GetEarnings(address _user) internal view returns (uint256) {
        uint256 totCount = tradingPool[_user].length;
        uint256 _totMinted = 0;
        uint256 _totSwapped = 0;
        uint256 _totXDUSDBalance = 0;
        uint256 _totalEarnings = 0;
        for (uint256 i = 0; i < totCount; i++) {
            DebtPool memory debts = tradingPool[_user][i];
            if (debts.isXDUSD) {
                if (debts.isMinted) {
                    _totMinted = _totMinted.add(debts.synthValue);
                } else {
                    _totSwapped = _totSwapped.add(debts.synthValue);
                }
            } else {
                uint256 _tempEarn = calculateWithoutCratio(
                    debts.synthValue,
                    debts.xSynSymbol
                );
                _totalEarnings = _totalEarnings.add(_tempEarn);
            }
        }
        if (_totMinted > _totSwapped) {
            _totXDUSDBalance = _totMinted.sub(_totSwapped);
        }
        _totalEarnings = _totalEarnings.add(_totXDUSDBalance);

        return _totalEarnings;
    }

    function getMyCollateralRatio(address _user)
        public
        view
        returns (uint256 _totalActual, uint256 _totalExpected)
    {
        //updating Other synthetix debit

        uint256 _totalActualValues = GetEarnings(_user);
        uint256 _totalExpectedValues = calculateInvested(_user);
        return (_totalActualValues, _totalExpectedValues);
    }

    function calculateInvested(address _user) internal view returns (uint256) {
        uint256 _totalXDCDeposited = deposits[_user].xdcDeposit;
        uint256 _totalPLIDeposited = deposits[_user].pliDeposit;
        uint256 _totalXDUSDFORPLI = 0;
        uint256 _totalXDUSDFORXDC = 0;

        if (_totalXDCDeposited > 0) {
            uint256 _currentPrice = ExchangeRate().showCurrentPrice("XDC");
            _totalXDUSDFORXDC = _totalXDCDeposited.mul(_currentPrice);
        }
        if (_totalPLIDeposited > 0) {
            uint256 _currentPrice = ExchangeRate().showCurrentPrice("PLI");
            _totalXDUSDFORPLI = _totalPLIDeposited.mul(_currentPrice);
        }

        uint256 _xdusdWorthforInvested = _totalXDUSDFORXDC.add(
            _totalXDUSDFORPLI
        );
        uint256 _tokenAfterCratio = (_xdusdWorthforInvested /
            (minCRatio / MAX_BPS)) / 10000;

        return _tokenAfterCratio;
    }

    //internal function for transferpayment
    function transferFundsToContract(uint256 _amount, address _tokenaddress)
        internal
    {
        IERC20(_tokenaddress).transferFrom(msg.sender, address(this), _amount);
    }

    /* ========== EVENTS ========== */
    event MinimumDepositAmountUpdated(uint256 amount);
    event calculatedRatio(
        uint256 collatrealApplied,
        uint256 usdTomint,
        uint256 currentPrice
    );
    event emitRatio(uint256 cratio, uint256 earnings, uint256 stakings);
}
