import React from "react";
import { ethers } from "ethers";

import { Score } from "./Card";

import { blockchains } from "../utilities/blockchains";
import useSWR from "swr";

import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MintScore(props) {
  const [scoreValue, setScoreValue] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [scoreTokenValue, setScoreTokenValue] = React.useState("");
  const [noData, setNoData] = React.useState(true);
  const [API_HOST, setApiHost] = React.useState(null);
  const [currentBlockchain, setCurrentBlockchain] = React.useState(null);
  const renderAfterCalled = React.useRef(false);

  const isEcoScore =
    blockchains.find((b) => b.slug === props.blockchainSlug).group === "eco"
      ? true
      : false;

  if (window.ethereum === undefined) {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <h3>
              Please{" "}
              <a target="_blank" href="https://metamask.io/download/">
                Install Metamask Extension
              </a>{" "}
              first.
            </h3>
          </div>
        </div>
      </div>
    );
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const contractAddress = getContractAddress(props.blockchain);
  if (contractAddress === undefined) {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <h3>Please use supported blockchain for minting NFT.</h3>
          </div>
        </div>
      </div>
    );
  }

  const chainId = getChainId(props.blockchain);
  const ABI =
    '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getScore","outputs":[{"components":[{"internalType":"uint16","name":"value","type":"uint16"},{"internalType":"uint256","name":"updated","type":"uint256"}],"internalType":"struct NomisScore.Score","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"scores","outputs":[{"internalType":"uint16","name":"value","type":"uint16"},{"internalType":"uint256","name":"updated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"score","type":"uint16"}],"name":"setScore","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const getScoreToken = async (address) => {
    try {
      const score = await contract.getScore(address);
      setScoreTokenValue(
        `${score.value / 100} , last update at ${new Date(
          score.updated * 1000
        ).toLocaleDateString()}`
      );
    } catch (error) {
      setScoreTokenValue(error.reason);

      console.error("getScore Error: ", error);
    }
  };

  function getContractAddress(blockchain) {
    for (let i = 0; i < blockchains.length; i++) {
      if (blockchains[i].slug === blockchain) {
        return blockchains[i].contractAddress;
      }
    }
  }

  function getChainId(blockchain) {
    for (let i = 0; i < blockchains.length; i++) {
      if (blockchains[i].slug === blockchain) {
        return blockchains[i].chainId;
      }
    }
  }

  function getNetworkData(chainId) {
    for (let i = 0; i < blockchains.length; i++) {
      if (blockchains[i].chainId === chainId) {
        return blockchains[i].networkData;
      }
    }
  }

  const [loading, setLoading] = React.useState(true);

  async function fetchMyScore(address, blockchain, apiHost) {
    await fetch(
      blockchains.find((b) => b.slug === props.blockchainSlug).group === "eco"
        ? `${apiHost}/api/v1/${blockchain}/wallet/${address}/eco-score?ecoToken=0`
        : `${apiHost}/api/v1/${blockchain}/wallet/${address}/score`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setScoreValue(Math.floor(result.data.score * 10000));
          setNoData(result.data.stats.noData);
        },
        (error) => {
          console.error(error);
        }
      )
      .finally(() => setLoading(false));
  }

  async function tryToSwitchChain() {
    if (window.ethereum.networkVersion !== chainId) {
      if (chainId === undefined) {
        return false;
      }

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + chainId.toString(16) }], // chainId must be in hexadecimal numbers
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [getNetworkData(chainId)],
            });
          } catch (addError) {
            console.log("addChain Error: ", addError);
            return false;
          }
        } else {
          console.error("switchChain Error: ", switchError);
          return false;
        }
      }

      return true;
    }
  }

  async function mintNomisToken() {
    try {
      setLoading(true);
      var switchResult = await tryToSwitchChain();
      if (switchResult) {
        const transaction = currentBlockchain === "xdc" 
          ? await contract.setScore(scoreValue, { gasLimit: 315750 }).catch(console.error)
          : await contract.setScore(scoreValue);
        await transaction.wait();
        await getScoreToken(addressValue);
      }
    } catch (error) {
      console.error("setScore Error: ", error);
    }
    setLoading(false);
  }

  async function onInit(blockchain, action, apiHost) {
    if (renderAfterCalled.current) {
      return;
    }
    renderAfterCalled.current = true;

    setCurrentBlockchain(blockchain);
    if (apiHost !== undefined) {
      setApiHost(apiHost);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAddressValue(accounts[0]);
      getScoreToken(accounts[0]).catch(console.error);
      fetchMyScore(accounts[0], blockchain, apiHost).catch(console.error);

      window.ethereum.on("accountsChanged", function (accounts) {
        getScoreToken(accounts[0]).catch(console.error);
        fetchMyScore(accounts[0], blockchain, apiHost).catch(console.error);
      });
  
      if (action === "openMint") {
        handleOpen();
      }
      else if (action === "showPaymentError") {
        alert('Payment failed!'); // TODO - change to popup
      }
      else if (action === "showCheckoutCancel") {
        alert('Checkout cancelled!'); // TODO - change to popup
      }
    }
  }

  onInit(props.blockchain, props.action, props.apiHost);

  const wallet = { score: scoreValue / 10000, stats: { noData } };

  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 200);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  const { data: allCustomers, error: allCustomersError } = useSWR(
    `${API_HOST}/api/v1/rapyd/customers`,
    fetcher
  );

  const [checkout, setCheckout] = React.useState(null);
  const [paid, setPaid] = React.useState(false);
  const [buttonLabel, setButtonLabel] = React.useState(isEcoScore ? "Create checkout" : "Mint or Update");
  // const location = useGeoLocation();
  // console.log(location.country);
  // const currency = countries.all.find((c) => c.alpha2 === location.country)
  //   .currencies[0];

  const mintEcoNomisToken = async (apiHost) => {
    setLoading(true);
    try {
      var switchResult = await tryToSwitchChain();
      if (!switchResult) {
        return;
      }
    } catch (error) {
      console.error("setScore Error: ", error);
      return;
    }

    let domain = window.location.origin === "http://localhost:3000" 
      ? "https://test.nomis.cc" 
      : window.location.origin;

    // disable Rapyd payment for prod
    if (domain.includes("test.") !== true) {
      console.log(domain.includes("test."));
      setPaid(true);
      setButtonLabel("Mint or Update");
      setLoading(false);
      return;
    }

    const isCustomerExist = allCustomers.data.find(
      (customer) => customer.name === addressValue
    );

    if (isCustomerExist) {
      window.localStorage.setItem("customerId", isCustomerExist.id);
    } else {
      await fetch(`${apiHost}/api/v1/rapyd/customer`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: addressValue,
        }),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          window.localStorage.setItem("customerId", data.data.id);
        });
    }

    if (!window.localStorage.getItem("checkoutId")) {
      let customerId = window.localStorage.getItem("customerId");

      await fetch(`${apiHost}/api/v1/rapyd/checkout`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: 4.99,
          country: "us",
          currency: "usd",
          customer: customerId,
          complete_payment_url: `${domain}/score/polygon_eco/${addressValue}?action=openMint`,
          error_payment_url: `${domain}/score/polygon_eco/${addressValue}?action=showPaymentError`,
          complete_checkout_url: `${domain}/score/polygon_eco/${addressValue}?action=openMint`,
          cancel_checkout_url: `${domain}/score/polygon_eco/${addressValue}?action=showCheckoutCancel`,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.localStorage.setItem("checkoutId", data.data.id);
      });
    }

    let checkoutId = window.localStorage.getItem("checkoutId");
    await fetch(`${apiHost}/api/v1/rapyd/checkout/${checkoutId}`)
      .then((response) => response.json())
      .then((data) => {
        setButtonLabel("Pay $4.99");
        setCheckout(data);
        if (data.data.payment.status === "ACT") {
          setButtonLabel("Complete payment $4.99");
        }
        else if (data.data.payment.status === "CLO") {
          setPaid(true);
          setButtonLabel("Mint or Update");
        }
      });

    setLoading(false);
  };

  return (
    <section className="mintButton">
      <button className="goMint" onClick={handleOpen}>
        Mint Your Score
      </button>
      {isOpen ? (
        <>
          <div
            className={`overlay${isVisible ? " visible" : ""}`}
            onClick={handleClose}
          ></div>
          <section className={`mint${isVisible ? " visible" : ""}`}>
            <div className="container">
              <div className="heading">
                <h3>Mint My Score</h3>
                <div className="close" onClick={handleClose}>
                  close
                </div>
              </div>
              <div className="wallet">
                <h4>Connected Wallet Address</h4>
                <p className="address">{addressValue}</p>
              </div>

              <Score wallet={wallet} />

              <div className="token">
                <h4>My Nomis Token on {props.blockchain}</h4>
                <p>Minted Token: {scoreTokenValue}</p>
              </div>

              <div className="action">
                {loading ? (
                  <div className="action loading">Loading...</div>
                ) : !isEcoScore || paid ? (
                  <button
                    type="submit" 
                    className="button" 
                    onClick={mintNomisToken}>
                    {buttonLabel}
                  </button>
                ) : window.localStorage.getItem("checkoutId") && checkout ? (
                  <Link href={checkout.data.redirect_url} target="_blank">
                    <button type="submit" className="button">
                      {buttonLabel}
                    </button>
                  </Link>
                ) : (
                  <button 
                    type="submit" 
                    className="button" 
                    onClick={mintEcoNomisToken(API_HOST)}>
                    Create checkout
                  </button>
                )}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
}
