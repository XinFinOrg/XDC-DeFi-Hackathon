
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import WXDC from './Components/WXDC';
import MintXinUSD from './Components/MintXinUSD';
import Analytics from './Components/Analytics';
import StackXinUSD from './Components/StackXinUSD';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import WalletConnect from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';


function App() {

  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState(null)

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    disableInjectedProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnect, // required
            options: {
                infuraId: "", // Required
                network: "mainnet",
                qrcodeModalOptions: {
                    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
                }
            }
        },
        'custom-xdc': {
            display: {
                name: 'XDC Pay',
                logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2634.png',
                description: 'Connect with XDC Pay'
            },
            package: detectEthereumProvider,
            connector: async (_detectEthereumProvider) => {
                const provider = await _detectEthereumProvider();
                console.log("provider", provider)
                await provider.enable();
                return provider;
            }
        },
    },
});

const onConnect = async () => {
    try {
        const instance = await web3Modal.connect();
        const providerConnect = new ethers.providers.Web3Provider(instance);
        setProvider(providerConnect)
        const signer = providerConnect.getSigner();
        setAddress(await signer.getAddress())

    } catch (err) {
        console.log("err", err)
    }
}

if(address == null) {
    return(
      <div  align="center">
        <button id='connectBtn' class="btn btn-primary" onClick={onConnect}>Connect</button>
      </div>
    )
}
  
  else{

    return(

      <>
      <HashRouter basename='/'>
    
    <div className="App">
       <Navbar/>

      <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/WXDC">
            <WXDC/>
          </Route>

          <Route exact path="/MintXinUSD">
            <MintXinUSD/>
          </Route>

          <Route exact path="/Analytics">
            <Analytics/>
          </Route>

          <Route exact path="/StackXinUSD">
            <StackXinUSD/>
          </Route>


          
        </Switch>

    </div>
    </HashRouter>
    </>
  );
  }
}

export default App;
