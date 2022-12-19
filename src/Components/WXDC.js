import React, { useState,useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnect from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import { Contract, ethers } from 'ethers';
import { ABI, contractAddress, WXDCABI, WXDCContractAddress } from '../Constants/Constants';

const WXDC = () => {

  const [mintXDCToken, setMintXDCToken] = useState(0)
  const [burnXDCToken, setBurnXDCToken] = useState(0)

// ########################################################################
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
// ########################################################################


    const getNum = async() => {

        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const contractInstance = new ethers.Contract(contractAddress, ABI, signer)
        const num = await contractInstance.x()
        console.log("X:- ", num.toString())

    }

    const setNum = async() => {
      const signer = provider.getSigner();
        const address = await signer.getAddress();

        const contractInstance = new ethers.Contract(contractAddress, ABI, signer)

        const set = await contractInstance.setNum(65);
        console.log("address:- ", address)   
    }

    const mintXDCFun = async () => {
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(WXDCContractAddress, WXDCABI, signer);
      const mintTx = await contractInstance.mint({value : mintXDCToken})
      await mintTx.wait();
      window.alert("Token Minted!")
    }

    const WithdrawXDC = async() => {
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(WXDCContractAddress, WXDCABI, signer);
      const burnTx = await contractInstance.burnTokes(burnXDCToken)
      await burnTx.wait();
      window.alert("XDC withdrawal successfuly!")

    }

    const getXDC = (e) => {
      let m = (e.target.value)
      let ethersToWei = ethers.utils.parseUnits(m.toString(), "ether");
      setMintXDCToken(ethersToWei)
      // console.log("ethersToWei", ethersToWei.toString())
    }
    const getWXDC = (e) => {
      let m = (e.target.value)
      let ethersToWei = ethers.utils.parseUnits(m.toString(), "ether");
      setBurnXDCToken(ethersToWei)
    }

    return (
        <div align="center">

          <br /><br />
          <h1>Mint WXDC</h1>
          <br /><br />
          <input onChange={getXDC} type="text" placeholder='Enter Amount of XDC' />
          <button class="btn btn-primary"  onClick={mintXDCFun}>Mint WXDC</button>

          <br /> <br /> <br />
          
          <input  onChange={getWXDC} type="text" placeholder='Enter Amount of WXDC' />
          <button class="btn btn-primary" onClick={WithdrawXDC}>Withdraw XDC</button>

        </div>
    );
}


export default WXDC