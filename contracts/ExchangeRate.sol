// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;
import "@goplugin/contracts/src/v0.8/PluginClient.sol";

contract ExchangeRate is PluginClient {
    using Plugin for Plugin.Request;
    string public constant CONTRACT_NAME = "EXCHANGERATE";
    //Initialize Oracle Payment
    uint256 private constant ORACLE_PAYMENT = 0.0001 * 10**18;
    address public oracle; // "0x97A6d407f4CD30936679d0a28A3bc2A7F13a2185"
    string public jobId; // "32abe898ea834e328ebeb714c5a0991d"
    uint256 public currentValue;
    uint256 public latestTimestamp;

    struct MarketPrice {
        bytes32 reqid;
        uint256 price;
        string fSymbol;
        uint256 updatedOn;
    }

    struct CurrentPrice {
        string fSymbol;
        uint256 price;
        uint256 updatedOn;
    }

    mapping(bytes32 => MarketPrice) public markets;
    mapping(string => CurrentPrice) public prices;

    //Initialize event RequestFulfilled
    event RequestFulfilled(
        bytes32 indexed requestId,
        uint256 indexed currentVal
    );

    //Initialize event requestCreated
    event requestCreated(
        address indexed requester,
        bytes32 indexed jobId,
        bytes32 indexed requestId
    );
    event requestCreatedTest(bytes32 indexed jobId, bytes32 indexed requestId);

    //Constructor to pass Pli Token Address during deployment
    constructor(address _pli, address _oracle,string memory _jobid)   {
        setPluginToken(_pli);
        oracle = address(_oracle);
        jobId = _jobid;
    }

    function showPrice(bytes32 _reqId) public view returns (uint256) {
        return markets[_reqId].price;
    }

    function showCurrentPrice(string memory _fsym) public view returns (uint256) {
        return prices[_fsym].price;
    }

    //_fsyms should be the name of your source token from which you want the comparison
    //_tsyms should be the name of your destinaiton token to which you need the comparison

    function requestData(string memory _fSymbol, string memory _tSymbol)
        public
        returns (bytes32)
    {
        Plugin.Request memory req = buildPluginRequest(
            stringToBytes32(jobId),
            address(this),
            this.fulfill.selector
        );
        req.add("_fsyms", _fSymbol);
        req.add("_tsyms", _tSymbol);
        req.addInt("times", 10000);
        bytes32 reqId = sendPluginRequestTo(oracle, req, ORACLE_PAYMENT);
        latestTimestamp = block.timestamp;
        markets[reqId] = MarketPrice(
            reqId,
            0,
            _fSymbol,
            latestTimestamp
        );
        prices[_fSymbol] = CurrentPrice(
            _fSymbol,
            0,
            latestTimestamp
        );
        // emit requestCreated(_caller, stringToBytes32(jobId), reqId);
        return reqId;
    }

    //callBack function
    function fulfill(bytes32 _requestId, uint256 _currentval)
        public
        recordPluginFulfillment(_requestId)
    {
        markets[_requestId].price = _currentval;
        string memory _fsym = markets[_requestId].fSymbol;
        prices[_fsym].price = _currentval;
        currentValue = _currentval;
        emit RequestFulfilled(_requestId, _currentval);
    }

    function getPluginToken() public view returns (address) {
        return pluginTokenAddress();
    }

    //With draw pli can be invoked only by owner
    function withdrawPli() public {
        PliTokenInterface pli = PliTokenInterface(pluginTokenAddress());
        require(
            pli.transfer(msg.sender, pli.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    //Cancel the existing request
    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) public  {
        cancelPluginRequest(
            _requestId,
            _payment,
            _callbackFunctionId,
            _expiration
        );
    }

    //String to bytes to convert jobid to bytest32
    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
