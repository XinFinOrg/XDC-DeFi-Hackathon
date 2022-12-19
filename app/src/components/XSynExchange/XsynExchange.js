import { useState, useContext } from 'react';
import './XsynExchange.css';
const { executeTransaction, EthereumContext, log, queryData, convertPriceToEth, queryEvents } = require('react-solidity-web3');

function XsynExchange() {
  
  const [submitting, setSubmitting] = useState(false);
  const { provider, XSynExchange,xdusd,XsynProtocol } = useContext(EthereumContext);

  const addKeyExchangeAddress = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _name = "XDSRX";
    let _woPrefix = "SRX";
    let _destination = "0xd88848FC4551Cb0150ae7AC96A6791fD4196Df20";
    let response1 = await executeTransaction(XSynExchange, provider, 'updateSupportedTokens', [_name,_woPrefix, _destination], 0);
    log("addKeyExchangeAddress", "hash", response1.txHash);
    setSubmitting(false);
  }

  const approveTransfer = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _stakeValue = await convertPriceToEth("3", "XDUSD");
    console.log("stakevalue is", _stakeValue);
    let response1 = await executeTransaction(xdusd, provider, 'approve', [XSynExchange.address,_stakeValue], 0);
    log("approveTransfer", "hash", response1.txHash);
    setSubmitting(false);
  }

  const exchangeXDUSDwithSynths = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _amount = await convertPriceToEth("3", "XDUSD");
    let _preferredSynthAddress="0x62AC194be752Be361B06D0d1A0f90827bf123C7A";
    let  _woprefixSynth="SRX";
    let  _wprefixSynth="XDSRX";
    console.log("stakevalue is", _amount);
    let response1 = await executeTransaction(XSynExchange, provider, 'exchangeXDUSDForSynths', [_amount,_preferredSynthAddress,_woprefixSynth,_wprefixSynth], 0);
    log("exchangeXDUSDwithSynths", "hash", response1.txHash);
    let response2 = await queryEvents(XSynExchange, provider, 'updatedebt',response1.blockNumber);
    console.log("response2",response2,response2[0],response2[1],response2[2],response2[3]);
    let response3 = await executeTransaction(XsynProtocol, provider, 'updateDebtPoolSynth', [response2[0],response2[1],response2[2],response2[3]], 0);
    log("updateDebtPoolSynth", "hash", response3.txHash);
    let response4 = await executeTransaction(XsynProtocol, provider, 'updateDebtPoolXDUSD', [response2[0],response2[1]], 0);
    log("updateDebtPoolXDUSD", "hash", response4.txHash);
    setSubmitting(false);
  }

  const queryExchangeAddress = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _name = "XSynProtocol";
    let response1 = await queryData(XSynExchange, provider, 'supportedAddress', [_name]);
    log("queryExchangeAddress", "hash", response1)
    setSubmitting(false);
  }


  const calculateUnits = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _name = "PAX";
    let _value = await convertPriceToEth("1", "XDC");
    let response1 = await queryData(XSynExchange, provider, 'calculateUnits', [_value,_name]);
    log("calculateUnits", "hash", response1)
    setSubmitting(false);
  }

  const fetchSyntheticPrices = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let response1 = await queryData(XSynExchange, provider, 'fetchPrices', []);
    log("fetchSyntheticPrices", "hash", response1)
    setSubmitting(false);
  }

  const showBalances = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let symbol = "XDUSD";
    let response1 = await queryData(XSynExchange, provider, 'showBalances', [symbol]);
    log("showBalances", "hash", response1)
    setSubmitting(false);
  }

  return <div className="Container">
    <div>
      <h1>addKeyExchangeAddress</h1><br></br>
      <form onSubmit={addKeyExchangeAddress}>
        <button type="submit" disabled={submitting}> {submitting ? 'Adding..' : 'Add Key Address'}</button>
      </form>
    </div>
    <div>
      <h1>Show Balance</h1><br></br>
      <form onSubmit={showBalances}>
        <button type="submit" disabled={submitting}> {submitting ? 'Show..' : 'Show Balance'}</button>
      </form>
    </div>
    <div>
      <h1>Query Exchange Address</h1><br></br>
      <form onSubmit={queryExchangeAddress}>
        <button type="submit" disabled={submitting}> {submitting ? 'Querying..' : 'Query Address'}</button>
      </form>
    </div>
    <div>
      <h1>Fetch Synthetic Prices</h1><br></br>
      <form onSubmit={fetchSyntheticPrices}>
        <button type="submit" disabled={submitting}> {submitting ? 'Fetching..' : 'Fetch Synthetic Assets'}</button>
      </form>
    </div>
    <div>
      <h1>approveTransfer</h1><br></br>
      <form onSubmit={approveTransfer}>
        <button type="submit" disabled={submitting}> {submitting ? 'Approve..' : 'Approve Transfer'}</button>
      </form>
    </div>
    <div>
      <h1>exchangeXDUSDwithSynths</h1><br></br>
      <form onSubmit={exchangeXDUSDwithSynths}>
        <button type="submit" disabled={submitting}> {submitting ? 'Exchanging..' : 'Exchange XDUSD for Synths'}</button>
      </form>
    </div>
    <div>
      <h1>calculateUnits</h1><br></br>
      <form onSubmit={calculateUnits}>
        <button type="submit" disabled={submitting}> {submitting ? 'Calculating..' : 'Calculate Units'}</button>
      </form>
    </div>
  </div> 
}



export default XsynExchange;