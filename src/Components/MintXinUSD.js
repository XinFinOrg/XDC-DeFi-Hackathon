import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal';
import WalletConnect from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import { XinUSDABI, XinUSDContractAddress } from '../Constants/Constants';

function MintXinUSD() {
  const [currentXDCPrice, setCurrentXDCPrice] = useState(0)
  const [currentXDCPrice2, setCurrentXDCPrice2] = useState("0")
  const [xinUSDToken, setXinUSDToken] = useState(0)


  // ########################################################################
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
    url()

} catch (err) {
    console.log("err", err)
}
}
useEffect( () => {
  onConnect()
} ,[])

// ########################################################################


  const mintXinUsdFun = async() => {
    await url()
    const signer = provider.getSigner() 

    console.log("CurrentXDCPrice", currentXDCPrice)

    const contractInstance = new ethers.Contract(XinUSDContractAddress,XinUSDABI , signer);
    // const mintValue = ( parseFloat(1) / parseFloat(currentXDCPrice) * 2 ) ;
    // console.log("mintValue ",mintValue)
    // let ethersToWei = ethers.utils.parseUnits(mintValue.toString(), "ether");
    // console.log("ethersToWei", ethersToWei.toString())
    // setCurrentXDCPrice( ethersToWei)
    const p = (currentXDCPrice * xinUSDToken)
    let ethersToWei = ethers.utils.parseUnits(p.toString(), "ether");
    const mintXinTx = await contractInstance.mint(ethersToWei);

    // await mintXinTx.wait();
    window.alert("XinUSD minted!")
  }

  const url = async () => {
    await fetch("https://api.coingecko.com/api/v3/simple/price?ids=xdce-crowd-sale&vs_currencies=usd") .then((res) => res.json()) .then((data) => {
        // console.log(data["xdce-crowd-sale"]["usd"]);
        
        const mintValue = ( parseFloat(1) / parseFloat(data["xdce-crowd-sale"]["usd"]) * 2 ) ;
        // console.log(mintValue)
        
        // console.log("ethersToWei",ethersToWei.toString())
        // setCurrentXDCPrice(ethersToWei.toString());
        setCurrentXDCPrice(mintValue);

        
        // console.log("mintValue ",mintValue)
        // setCurrentXDCPrice(ethersToWei)
        // let ethersToWei = ethers.utils.parseUnits(mintValue.toString(), "ether");
        // setCurrentXDCPrice2((mintValue).toFixed(3))

        return(data["xdce-crowd-sale"]["usd"]);
  
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWXDC = (e) => {
    let m = (e.target.value)
    setXinUSDToken(m)
  }

  return (
    <div>
      <br />
        <h1>MintXinUSD</h1>
        {/* <button onClick={url}>get data</button> */}
        <br /><br />
        <input onChange={getWXDC} type="text" placeholder='Enter Amount of WXDC' />
        <button class="btn btn-primary" onClick={mintXinUsdFun}>Mint XinUSD</button>
        <br /> <br />
        <h3>Current XinUSD costs {((currentXDCPrice).toFixed(3)).toString()} WXDC</h3>
    </div>
  )
}

export default MintXinUSD