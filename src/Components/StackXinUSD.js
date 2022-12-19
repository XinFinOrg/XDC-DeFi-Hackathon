import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal';
import WalletConnect from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import { ERC20ABI, WXDCContractAddress, XinUSDABI, XinUSDContractAddress } from '../Constants/Constants';

function StackXinUSD() {
  
  const [addWXDCTokens, setaddWXDCTokens] = useState(0)
  const [addWXDCTokens2, setaddWXDCTokens2] = useState(0)
  const [btnHandler, setBtnHandler] = useState("Approve Token")

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

} catch (err) {
    console.log("err", err)
}
}
useEffect( () => {
  onConnect()
} ,[])

// ########################################################################

  const approveToken = async() => {
    const signer = provider.getSigner()
    const ERC20contractInstance = new ethers.Contract(WXDCContractAddress,ERC20ABI,signer);
    const getApprove = await ERC20contractInstance.approve(XinUSDContractAddress, addWXDCTokens);
    await getApprove.wait();
    console.log("Token Approved!")
  }
  
  const addLiquidityFun = async() => {
      await approveToken()
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(XinUSDContractAddress, XinUSDABI , signer);
      const addLiquidityTx = await contractInstance.addLiquidity(addWXDCTokens);
      await addLiquidityTx.wait();
      window.alert("Liquidity Added Succesfully!")
  }

  const removeLiquidityFun = async() => {
      await approveToken()
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(XinUSDContractAddress, XinUSDABI , signer);
      const removeLiquidityTx = await contractInstance.removeLiquidity(addWXDCTokens2);
      await removeLiquidityTx.wait();
      window.alert("Liquidity Removed Succesfully!")
  }

  const getWXDC = (e) => {
    let m = (e.target.value)
    let ethersToWei = ethers.utils.parseUnits(m.toString(), "ether");
    setaddWXDCTokens(ethersToWei)
  }
  const getWXDC2 = (e) => {
    let m = (e.target.value)
    let ethersToWei = ethers.utils.parseUnits(m.toString(), "ether");
    setaddWXDCTokens2(ethersToWei)
  }

  return (
    <> 
      <h2> Stack WXDC to Mint XDC</h2>
      <h4>Collatralized Ratio: 200%</h4>

      <input onChange={getWXDC2} type="text" placeholder='Enter Amount of XDC' />
      <button class="btn btn-primary" onClick={addLiquidityFun}>Add Liquidity</button>
      
      <br /> <br />
      
      <input onChange={getWXDC} type="text" placeholder='Enter Amount of XDC' />
      <button class="btn btn-primary" onClick={removeLiquidityFun}>Remove Liquidity</button>
    </>
    
  )
}

export default StackXinUSD