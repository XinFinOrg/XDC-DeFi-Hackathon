import { useState, useContext } from 'react';
import { ethers } from 'ethers';

import './RESOLVER.css';
const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-web3');

function RESOLVER() {
  const [submitting, setSubmitting] = useState(false);
  const { provider, AddresssResolver } = useContext(EthereumContext);
  console.log("AddresssResolver", AddresssResolver);

  const addAddress = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _name =  ethers.utils.formatBytes32String("EXCHANGERATE");
    let _destination = "0x717cb6C73e80b084E8C5E367577960719fe257F8";
    // let _name =  ethers.utils.formatBytes32String("XSynProtocol");
    // let _destination = "0xaCf3bB4AE2069344695ca40c43183996Cf34A06f";
    // let _name = ethers.utils.formatBytes32String("XDUSD");
    // let _destination = "0x83c0f9f3Ec1cBDcE217aB31719F711202E0980F2";
    //     let _name = ethers.utils.formatBytes32String("XSynExchange");
    // let _destination = "0xAeD671BC7bF3161fb33A1994562Cd10178B232Ee";
    //     let _name = "XDBTC";
    // let _destination = "0x711312CE80Bb3Fe0865cec30f20668342501706c";
    //         let _name = "XDETH";
    // let _destination = "0x73B2A08718ebEF556c421374207Eb29cE53C4056";
    // let _name = "XDPAX";
    // let _destination = "0x57521348ED7D11C4D5F5f79DeC1315ff4902286d";
    let response1 = await executeTransaction(AddresssResolver, provider, 'updateCache', [_name, _destination],0);
    log("addAddress", "hash", response1.txHash)
    setSubmitting(false);
  }

  const fetchAddress = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _name =  ethers.utils.formatBytes32String("EXCHANGERATE");
    let response1 = await queryData(AddresssResolver, provider, 'fetchAddress', [_name]);
    log("fetchAddress", "hash", response1)
    setSubmitting(false);
  }

  return <div className="Container">
    <div>
      <h1>Add Address</h1><br></br>
      <form onSubmit={addAddress}>
        <button type="submit" disabled={submitting}>{submitting ? 'Adding..' : 'Add Address'}</button>
      </form>
    </div>
    <div>
      <h1>Fetch Address</h1><br></br>
      <form onSubmit={fetchAddress}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetchin..' : 'Fetch Address '}</button>
      </form>
    </div>
  </div>
}



export default RESOLVER;