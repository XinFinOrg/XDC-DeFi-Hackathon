import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
pragma experimental ABIEncoderV2;

interface IInvokeOracle {
    function requestData(address _caller) external returns (bytes32 requestId);

    function showPrice() external view returns (uint256);

    function depositPLI(uint256 _value) external returns (bool);
}

interface KRC20 {
    function approve(address spender, uint256 amount) external returns (bool);
}

contract Stable is ERC20 {
    struct loan {
        uint256 loanid;
        uint256 amount;
        uint256 price;
        uint256 interest;
        uint256 period;
        uint256 reqtimestamp;
        address initiator;
        uint256 amountxdc;
        uint256 amountrawxdc;
        bool status;
        bool completed;
        bool liquidated;
    }

    address CONTRACTADDR = 0x76c9F2fFb2d84d5f1e60Fce61597C9B0027fc636;
    bytes32 public requestId;

    IUniswapV2Router02 public uniswapRouter;
    uint256 public loanid = 0;
    uint256 BLOCK_IN_DAY = 43200;
    address WXDC = 0x2a5c77b016Df1b3b0AE4E79a68F8adF64Ee741ba;
    address toyo;
    mapping(uint256 => loan) public loans;

    constructor() ERC20("XDUSD", "XDUSD") {
        uniswapRouter = IUniswapV2Router02(
            0x3F11A24EB45d3c3737365b97A996949dA6c2EdDf
        );
        _mint(msg.sender, 1000);
        KRC20(0x33f4212b027E22aF7e6BA21Fc572843C0D701CD1).approve(
            CONTRACTADDR,
            50000000000000000000
        );
        toyo = address(this);
    }

    function getloan(uint256 amount, uint256 period) public returns(uint256) {
        require(amount > 1**18, "very less amount no loan needed");
        require(period > 1, "please increase the period");
        uint256 blocknumber = block.number;
        getPriceInfo();
        uint256 interest = ((amount * period) * 5) / 3000;

        address initiator = msg.sender;
        bool status = false;
        uint256 price = show();
        uint256 amountxdc = (((amount + interest) / price) * 10000);
        uint256 amountrawxdc = (amount / price) * 10000;
        loan memory newloan = loan(
            loanid,
            amount,
            price,
            interest,
            period,
            blocknumber,
            initiator,
            amountxdc,
            amountrawxdc,
            status,
            false,
            false
        );
        loans[loanid] = newloan;
        loanid++;
        return newloan.loanid;
    }

    function disburseloan(uint256 loanid) public payable {
        loan memory myloan = loans[loanid];
        require(myloan.initiator == msg.sender, "no disbursement to other acc");
        require(myloan.amountxdc <= msg.value, "not enough xdc");
         require(myloan.completed == false, "cannot disburse paid/liquidated loans");
        require(
            myloan.reqtimestamp + 600 >= block.number,
            "trying to scam my guy"
        );
        require(myloan.status == false);
        myloan.status = true;
        loans[loanid] = myloan;
        _mint(msg.sender, myloan.amount);
    }

    function repayloan(uint256 loanid) public {
        loan memory myloan = loans[loanid];
        require(myloan.initiator == msg.sender, "no disbursement to other acc");
        require(balanceOf(msg.sender) > myloan.amount, "can't pay the loan");
        require(myloan.status == true);
        _burn(msg.sender, myloan.amount);
        address payable abc = payable(msg.sender);
        abc.send(myloan.amountrawxdc);
        myloan.status = false;
        myloan.completed = true;
        loans[loanid] = myloan;

    }

    function liquidate(uint256 loanid) public {
        loan memory myloan = loans[loanid];
        uint256 currentprice = show();
        require(
            myloan.period + myloan.reqtimestamp < block.number ||
                (myloan.amountrawxdc * currentprice)* 11 / 100000 <
                myloan.amount,
            "cannot liquidate early or the amount the amount is still collaterized"
        );

        require(myloan.status == true, "it must be true");
        getPriceInfo();
        uint256 amount = myloan.amountrawxdc;
        address[] memory path = new address[](2);
        path[0] = WXDC;
        path[1] = toyo;
        uniswapRouter.swapExactETHForTokens{value: amount}(
            0,
            path,
            msg.sender,
            block.timestamp
        );
        myloan.status = false;
        myloan.liquidated = true;
        myloan.completed = true;
        loans[loanid] = myloan;
    }

    function getprice(uint256 loanid) internal view returns (uint256) {
        return 1;
    }

    function readloan(uint256 loanid) public view returns (loan memory) {
        return loans[loanid];
    }

    function show() public view returns (uint256) {
        return IInvokeOracle(CONTRACTADDR).showPrice();
    }

    function depositpli() external returns (bool) {
        return IInvokeOracle(CONTRACTADDR).depositPLI(500000000000000000);
    }

    function getPriceInfo() public returns (bytes32) {
        (requestId) = IInvokeOracle(CONTRACTADDR).requestData({
            _caller: address(this)
        });
        return requestId;
    }

    function getAllLoan() public view returns (loan[] memory) {
        loan[] memory myloan = new loan[](loanid);
        for (uint256 i = 0; i < loanid; i++) {
            loan storage mylo = loans[i];
            myloan[i] = mylo;
        }
        return myloan;
    }

    function getMyLoan() public view returns (loan[] memory) {
        loan[] memory myloan = new loan[](loanid);
        for (uint256 i = 0; i < loanid; i++) {
            if (loans[i].initiator == msg.sender) {
                loan storage mylo = loans[i];
                myloan[i] = mylo;
            }
        }
        return myloan;
    }
}
