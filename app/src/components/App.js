import { ethers } from 'ethers';
import './App.css';
import RESOLVER from './RESOLVER/RESOLVER';
import Xsyn from './XSyn/Xsyn';
import XsynExchange from './XSynExchange/XsynExchange';


import Header from './Header/Header';

import { abi as addressresolverabi } from '../artifacts/contracts/AddressResolver.sol/AddressResolver.json';
import { ADDRESSRESOLVER as addressresolver } from '../output.json';

import { abi as xsynabi } from '../artifacts/contracts/XSynProtocol.sol/XSynProtocol.json';
import { XSynProtocol as xsynaddress } from '../output.json';

import { abi as xsynexchangeabi } from '../artifacts/contracts/XSynExchange.sol/XSynExchange.json';
import { XSynExchange as xsynexchangeaddress } from '../output.json';

import { abi as xrc20abi } from '../xrc20/xrc20.json';
import { XDUSD } from '../output.json';
import { pliaddress } from '../output.json';


import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { connectWallet, createWeb3Provider, EthereumContext, createContractInstance, log } = require('react-solidity-web3');

var connectOptions = {
  rpcObj: {
    50: "https://rpc.xinfin.network",
    51: "https://rpc.apothem.network"
  },
  network: "mainnet",
  toDisableInjectedProvider: true
}

function App() {
  const [connecting, setconnecting] = useState(false);
  const [ethereumContext, setethereumContext] = useState({});

  const connect = async (event) => {
    event.preventDefault();
    const instance = await connectWallet(connectOptions);
    const {provider,signer} = await createWeb3Provider(instance);

    const AddresssResolver = await createContractInstance(addressresolver, addressresolverabi, provider);
    const XsynProtocol = await createContractInstance(xsynaddress, xsynabi, provider);
    const XSynExchange = await createContractInstance(xsynexchangeaddress, xsynexchangeabi, provider);
    const pli = await createContractInstance(pliaddress, xrc20abi, provider);
    const xdusd = await createContractInstance(XDUSD,xrc20abi,provider);

    const account = signer.getAddress();
    setethereumContext({ provider, AddresssResolver, account,XsynProtocol,XSynExchange ,pli,xdusd})
    log("Connect", "Get Address", await signer.getAddress());
    setconnecting(true);
  }
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>XSyn Protocol Decentralized Application </h1>
        <p>Powered by Plugin Decentralied Oracle Price Feed</p>
        <form onSubmit={connect}>
          <button type="submit" disabled={connecting}>{connecting ? 'Connecting...' : 'Connect'}</button>
        </form>
      </header>
      <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
        <h1 className='text-center'> XSyn Protocol APIs</h1><br/>

          <Xsyn />
          <h1 className='text-center'> Exchange APIs</h1>
          <br/>

          <XsynExchange/>
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default App;
