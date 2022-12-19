import { useState, useContext } from 'react';
import './Xsyn.css';
const { executeTransaction, EthereumContext, log, queryData, convertPriceToEth, queryEvents } = require('react-solidity-web3');

function Xsyn() {

  const [submitting, setSubmitting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [staking, setStaking] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showing, setShowing] = useState(false);
  const [querying, setQuerying] = useState(false);
  const [getting, setGetting] = useState(false);
  const [approving, setApproving] = useState(false);
  const [collecting, setCollecting] = useState(false);
  

  const { provider, XsynProtocol , pli} = useContext(EthereumContext);

  const addKeyAddress = async (event) => {
    event.preventDefault();
    setAdding(true);
    let _name = "EXCHANGERATE";
    let _destination = "0x3cEF8f7481D3BdaBB16B662d131110Ad0Dc7Bb0e";
    let response1 = await executeTransaction(XsynProtocol, provider, 'updateKeyAddress', [_name, _destination], 0);
    log("addKeyAddress", "hash", response1.txHash);
    setAdding(false);
  }

  const stakeXDCMintXDUSD = async (event) => {
    event.preventDefault();
    setStaking(true);
    let _stakeValue = await convertPriceToEth("500", "XDC");
    console.log("stakevalue is", _stakeValue);
    let response1 = await executeTransaction(XsynProtocol, provider, 'mintxdUSDForXDC', [], _stakeValue);
    log("stakeXDCMintXDUSD", "hash", response1.txHash);
    setStaking(false);
  }

  const updateDebtPool = async (event) => {
    event.preventDefault();
    setUpdating(true);
    let _totUsdSwapped = await convertPriceToEth("1", "XDC");
    let _totSynthsPurchased = await convertPriceToEth("1", "XDC");
    let addr = "0x4e1945cEc2539a9be460aB0aa7BdC1EADebde75e";
    let _symbolPurchased = "XDPAX";
    console.log("_totUsdSwapped is", _totUsdSwapped, _totSynthsPurchased);
    let response1 = await executeTransaction(XsynProtocol, provider, 'updateDebtPool', [addr, _totUsdSwapped, _totSynthsPurchased, _symbolPurchased], 0);
    log("updateDebtPool", "hash", response1.txHash);
    setUpdating(false);
  }

  const showMyDeposits = async (event) => {
    event.preventDefault();
    setShowing(true);
    let addr = "0x4e1945cEc2539a9be460aB0aa7BdC1EADebde75e";
    console.log("addr is", addr);
    let response1 = await queryData(XsynProtocol, provider, 'deposits', [addr]);
    log("showMyDeposits", "hash", response1);
    setShowing(false);
  }

  const queryAddress = async (event) => {
    event.preventDefault();
    setQuerying(true);
    let _name = "XDUSD";
    let response1 = await queryData(XsynProtocol, provider, 'keyaddress', [_name]);
    log("queryAddress", "hash", response1)
    setQuerying(false);
  }

  const showPrices = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _name = "XDC";
    let response1 = await queryData(XsynProtocol, provider, 'showPrice', [_name]);
    log("showPrices", "hash", response1)
    setSubmitting(false);
  }

  const getMyCollateralRatio = async (event) => {
    event.preventDefault();
    setGetting(true);
    let addr = "0x4e1945cEc2539a9be460aB0aa7BdC1EADebde75e";
    let response1 = await queryData(XsynProtocol, provider, 'getMyCollateralRatio', [addr]);
    log("getMyCollateralRatio", "hash", response1)
    setGetting(false);
  }

  const getMyEarnings = async (event) => {
    event.preventDefault();
    setCollecting(true);
    let addr = "0x4e1945cEc2539a9be460aB0aa7BdC1EADebde75e";
    let response1 = await queryData(XsynProtocol, provider, 'GetEarnings', [addr]);
    log("getMyEarnings", "hash", response1)
    setCollecting(false);
  }

  const queryTradingPool = async (event) => {
    event.preventDefault();
    setCollecting(true);
    let addr = "0x4e1945cEc2539a9be460aB0aa7BdC1EADebde75e";
    let response1 = await queryData(XsynProtocol, provider, 'tradingPool', [addr,1]);
    log("queryTradingPool", "hash", response1)
    setCollecting(false);
  }


  const getEstimation = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _totTokentoSend = await convertPriceToEth("200", "XDC");
    let _symbol = "XDC";
    let response1 = await queryData(XsynProtocol, provider, 'getEstimation', [_totTokentoSend, _symbol]);
    log("getEstimation", "hash", response1)
    setSubmitting(false);
  }

  const approveTransferForPLI = async (event) => {
    event.preventDefault();
    setApproving(true);
    let _stakeValue = await convertPriceToEth("1", "PLI");
    console.log("stakevalue is", _stakeValue);
    let response1 = await executeTransaction(pli, provider, 'approve', [XsynProtocol.address,_stakeValue], 0);
    log("approveTransferForPLI", "hash", response1.txHash);
    setApproving(false);
  }


  return <div className="Container">
    <div>
      <h1>getEstimation</h1><br></br>
      <form onSubmit={getEstimation}>
        <button type="submit" disabled={submitting}> {submitting ? 'Estimating..' : 'Get Estmation'}</button>
      </form>
    </div>
    <div></div>
    <div>
      <h1>AddKeyAddress</h1><br></br>
      <form onSubmit={addKeyAddress}>
        <button type="submit" disabled={adding}> {adding ? 'Adding..' : 'Add Key Address'}</button>
      </form>
    </div>
    <div>
      <h1>Query Address</h1><br></br>
      <form onSubmit={queryAddress}>
        <button type="submit" disabled={querying}> {querying ? 'Querying..' : 'Query Address'}</button>
      </form>
    </div>
    <div>
      <h1>stakeXDCMintXDUSD</h1><br></br>
      <form onSubmit={stakeXDCMintXDUSD}>
        <button type="submit" disabled={staking}> {staking ? 'Staking..' : 'Stake XDC'}</button>
      </form>
    </div>
    <div>
      <h1>showMyDeposits</h1><br></br>
      <form onSubmit={showMyDeposits}>
        <button type="submit" disabled={showing}> {showing ? 'Showing..' : 'Show Deposits '}</button>
      </form>
    </div>
    <div>
      <h1>getMyCollateralRatio</h1><br></br>
      <form onSubmit={getMyCollateralRatio}>
        <button type="submit" disabled={getting}> {getting ? 'Showing..' : 'Get My Collateral Ratio '}</button>
      </form>
    </div>
    <div>
      <h1>getMyEarnings</h1><br></br>
      <form onSubmit={getMyEarnings}>
        <button type="submit" disabled={collecting}> {collecting ? 'Earnings..' : 'Get My Earnings '}</button>
      </form>
    </div>
    <div>
      <h1>showPrices</h1><br></br>
      <form onSubmit={showPrices}>
        <button type="submit" disabled={submitting}> {submitting ? 'Show..' : 'Show Prices'}</button>
      </form>
    </div>
    <div>
      <h1>updateDebtPool</h1><br></br>
      <form onSubmit={updateDebtPool}>
        <button type="submit" disabled={updating}> {updating ? 'update..' : 'Update Debt'}</button>
      </form>
    </div>
    <div>
      <h1>approveTransferForPLI</h1><br></br>
      <form onSubmit={approveTransferForPLI}>
        <button type="submit" disabled={approving}> {approving ? 'Approving..' : 'Approve PLI Transfer'}</button>
      </form>
    </div>
    <div>
      <h1>queryTradingPool</h1><br></br>
      <form onSubmit={queryTradingPool}>
        <button type="submit" disabled={approving}> {approving ? 'Querying..' : 'Query Trading Pool'}</button>
      </form>
    </div>
  </div>
}



export default Xsyn;