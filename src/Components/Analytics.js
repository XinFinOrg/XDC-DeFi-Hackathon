import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal';
import WalletConnect from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import { XinUSDABI, XinUSDContractAddress, XinUSDVaultABI, XinUSDVaultAddress } from '../Constants/Constants';

function Analytics() {

    const [totalSupply, setTotalSupply] = useState(0);
    const [totalSurplusFund, setTotalSurplusFund] = useState(0);
    const [userLiquidityData , setUserLiquidityData] = useState(0);
    const [renderData, setRenderData] = useState(false)
// ########################################################################
const [provider, setProvider] = useState(null)
const [address, setAddress] = useState(null)
// const [signer, setSigner] = useState(null)

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
    // setSigner(providerConnect.getSigner())
    // renderDetails()

} catch (err) {
    console.log("err", err)
}
}

useEffect( () => {
   onConnect()
} ,[])
// useEffect(() => {
//     circulatingSupply()
// }, [])

// ########################################################################

const userLiquidity = async() => {
    const signer = provider.getSigner()
    const address = await signer.getAddress();
    setAddress(address)
    const contractInstance = new ethers.Contract(XinUSDContractAddress, XinUSDABI , signer);
    const addLiquidityTx = await contractInstance.liquidity(address);
    console.log(address)
    // await addLiquidityTx.wait();
    console.log(addLiquidityTx.toString())
    const ethValue = ethers.utils.formatEther(addLiquidityTx.toString());

    setUserLiquidityData(ethValue)
}

const circulatingSupply = async() => {
    const signer = provider.getSigner()
    const address = await signer.getAddress();
    setAddress(address)
    const contractInstance = new ethers.Contract(XinUSDContractAddress, XinUSDABI , signer);
    const totalSupplyTx = await contractInstance.totalSupply();
    // await totalSupplyTx.wait();  
    let ethersToWei = ethers.utils.formatEther(totalSupplyTx.toString());

    setTotalSupply(ethersToWei.toString())
}

const SurplusFunds = async() => {
    const signer = provider.getSigner()
    const contracInstance = new ethers.Contract(XinUSDContractAddress, XinUSDABI, signer)
    const availableFunds = await contracInstance.balanceOf(XinUSDVaultAddress)   
    setTotalSurplusFund(availableFunds.toString())
    console.log(availableFunds.toString())
}

const renderDetails = async () => {
    setRenderData(true)
    userLiquidity()
    circulatingSupply()
    SurplusFunds()
}

if (renderData) {
    return(
        <div>
            <br /><br /><br />

        {/* <h2>Total Value locked in Vault:- </h2> */}
        <h3>Surplus Funds {totalSurplusFund} WXDC</h3>
        <h3>Total XinUSD supply:- {totalSupply}XinUSD</h3>
        <h3>Your Liquidity {userLiquidityData} WXDC</h3>

        </div>
    )
}

else{

  return (
    <div>
        <button class="btn btn-primary" onClick={renderDetails}>getDetails</button>

    </div>
  )

    }
}

export default Analytics