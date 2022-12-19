import { createContext, useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providerOptions } from "xdcpay-connect";

import { ethers } from "ethers";

let signerEthers;

export const Web3ModalContext = createContext();

const Web3ModalProvider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState();
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [networkId, setNetworkId] = useState();
  const [connected, setConnected] = useState();

  useEffect(() => {
    const _web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    setWeb3Modal(_web3Modal);
  }, [setWeb3Modal]);

  const createWeb3 = (provider) => {
    var realProvider;

    if (typeof provider === "string") {
      if (provider.includes("wss")) {
        realProvider = new Web3.providers.WebsocketProvider(provider);
      } else {
        realProvider = new Web3.providers.HttpProvider(provider);
      }
    } else {
      realProvider = provider;
    }

    return new Web3(realProvider);
  };

  const resetWeb3 = useCallback(() => {
    setWeb3(null);
    setAccount(null);
    setChainId(null);
    setNetworkId(null);
    setConnected(false);
  }, [setAccount, setChainId, setConnected, setNetworkId, setWeb3]);

  const subscribeProvider = useCallback(
    async (_provider, _web3) => {
      if (!_provider.on) return;

      _provider.on("close", () => {
        resetWeb3();
      });
      _provider.on("accountsChanged", async (accounts) => {
        setAccount(_web3.utils.toChecksumAddress(accounts[0]));
      });
      _provider.on("chainChanged", async (chainId) => {
        console.log("Chain changed: ", chainId);
        const networkId = await _web3.eth.net.getId();
        setChainId(Number(chainId));
        setNetworkId(Number(networkId));
      });

      _provider.on("networkChanged", async (networkId) => {
        const chainId = await _web3.eth.getChainId();
        setChainId(Number(chainId));
        setNetworkId(Number(networkId));
      });
    },
    [resetWeb3, setAccount, setChainId, setNetworkId]
  );

  const connect = useCallback(async () => {
    if (!web3Modal) return;

    const _provider = await web3Modal.connect();
    if (_provider === null) return;

    const _web3 = createWeb3(_provider);
    setWeb3(_web3);

    const web3ProviderEthers = new ethers.providers.Web3Provider(_provider);
    signerEthers = web3ProviderEthers.getSigner();

    await subscribeProvider(_provider, _web3);

    const accounts = await _web3.eth.getAccounts();
    const _account = _web3.utils.toChecksumAddress(accounts[0]);
    const _networkId = await _web3.eth.net.getId();
    const _chainId = await _web3.eth.getChainId();

    setAccount(_account);
    setNetworkId(Number(_networkId));
    setChainId(Number(_chainId));
    setConnected(true);
  }, [
    web3Modal,
    setWeb3,
    subscribeProvider,
    setAccount,
    setNetworkId,
    setChainId,
    setConnected,
  ]);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [web3Modal, connect]);

  const disconnect = useCallback(async () => {
    if (web3 && web3.currentProvider) {
      const _provider = web3.currentProvider;
      if (_provider.close) await _provider.close();
    }
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    resetWeb3();
  }, [web3Modal, web3, resetWeb3]);

  return (
    <Web3ModalContext.Provider
      value={{
        web3,
        connect,
        disconnect,
        account,
        networkId,
        chainId,
        connected,
        signerEthers,
      }}
    >
      {children}
    </Web3ModalContext.Provider>
  );
};

export default Web3ModalProvider;
