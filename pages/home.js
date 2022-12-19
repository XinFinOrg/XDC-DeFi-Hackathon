import axios from "axios";
import { toast } from "react-hot-toast";
import { utils, Contract } from "ethers";
import { Web3ModalContext } from "../src/context/Web3ModalProvider";
import React, { useState, useContext } from "react";

import { PoolAddress, PoolABI } from "../src/utils/constants";
import { ethers } from "ethers";
import Loader from "../src/components/Loader";

const EIP712SignatureTypes = {
  SignatureContent: [
    { name: "nonce", type: "uint256" },
    { name: "price", type: "uint256" },
    { name: "multipliedBy", type: "uint256" },
    { name: "timestamp", type: "uint40" },
  ],
};

const Home = () => {
  const [XDC, setXDC] = useState("1");
  const [withdrawXDC, setWithdrawXDC] = useState();

  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState(0);
  const [USDAmount, setUSDAmount] = useState(0);
  const [withdrawUSDAmount, setWithdrawUSDAmount] = useState(0);

  const [loading, setLoading] = useState();
  const { account, web3, signerEthers } = useContext(Web3ModalContext);

  const generateMessage = () => {
    return Math.floor(Math.random() * 1000000);
  };

  function getEIP712Domain(address) {
    return {
      name: "LilCompound",
      version: "1.0",
      verifyingContract: address,
    };
  }

  function getSignatureContentObject(signatureContent) {
    return {
      nonce: signatureContent.nonce,
      price: signatureContent.price,
      multipliedBy: signatureContent.multipliedBy,
      timestamp: signatureContent.timestamp,
    };
  }

  async function signSignature(signatureContent, contractAddress, signer) {
    return signer._signTypedData(
      getEIP712Domain(contractAddress),
      EIP712SignatureTypes,
      getSignatureContentObject(signatureContent)
    );
  }

  async function timestampFromNow(delta) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://erpc.apothem.network"
    );
    const lastBlockNumber = await provider.getBlockNumber();
    const lastBlock = await provider.getBlock(lastBlockNumber);

    return lastBlock.timestamp + delta;
  }

  const XDC_ACCOUNT_2_PK =
    "f3f7097ebda3883ecc6cf8bfb166cd3fa3ba6f8a9a54cf1873539a94e2827e9f";

  const singAMessage = async () => {
    const response = await axios.get("/api/coinmarket");
    const XDC_PRICE_USD = response.data.result.data[2634].quote.USD.price;
    0;
    const SignatureContent = {
      nonce: generateMessage(),
      price: parseInt(XDC_PRICE_USD * 10 ** 6),
      multipliedBy: 10 ** 6,
      timestamp: await timestampFromNow(100),
    };

    const signer = new ethers.Wallet(
      XDC_ACCOUNT_2_PK,
      new ethers.providers.JsonRpcProvider("https://erpc.apothem.network")
    );

    let signature = await signSignature(
      SignatureContent,
      "0x96540DbD36E3C3f651bDf65A3ea95d2928bAC1E0",
      signer
    );

    return { SignatureContent, signature };
  };

  // POOL CONTRACT FUNCTIONS

  const depositCollateralXDC = async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }
    setLoading("depositCollateralXDC");
    try {
      const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
      let tx = await NameContract.methods
        .depositCollateralXDC()
        .send({ from: account, value: utils.parseEther(XDC) });
      console.log(tx, "DONE");
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Error in depositCollateralXDC ");
    }
    setLoading(false);
  };

  const withdrawCollateralXDC = async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }
    if (!withdrawXDC) {
      toast.error("Please set a amount");
      return;
    }
    setLoading("withdrawCollateralXDC");
    try {
      const { SignatureContent, signature } = await singAMessage();
      const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
      let tx = await NameContract.methods
        .withdrawCollateralXDC(
          parseInt(withdrawXDC),
          SignatureContent,
          signature
        )
        .send({ from: account });
      console.log(tx, "DONE");
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Error in withdrawCollateralXDC ");
    }
    setLoading(false);
  };

  const borrow = async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }
    setLoading("borrow");
    try {
      const { SignatureContent, signature } = await singAMessage();
      const contract = new Contract(PoolAddress, PoolABI, signerEthers);
      let tx = await contract.borrow(
        amount,
        currency,
        SignatureContent,
        signature
      );
      await tx.wait();
      console.log(tx, "DONE");
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Error in borrow");
    }
    setLoading(false);
  };

  const depositCollateralUSD = async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }
    if (!USDAmount) {
      toast.error("Please set a amount");
      return;
    }
    setLoading("depositCollateralUSD");
    try {
      const { SignatureContent, signature } = await singAMessage();

      const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
      let tx = await NameContract.methods
        .withdrawCollateralXDC(parseInt(USDAmount), SignatureContent, signature)
        .send({ from: account });
      console.log(tx, "DONE");
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in depositCollateralUSD");
    }
    setLoading(false);
  };

  const withdrawCollateralUSD = async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }
    if (!withdrawUSDAmount) {
      toast.error("Please set a amount");
      return;
    }
    setLoading("withdrawCollateralUSD");
    try {
      const { SignatureContent, signature } = await singAMessage();

      const NameContract = new web3.eth.Contract(PoolABI, PoolAddress);
      let tx = await NameContract.methods
        .withdrawCollateralUSD(
          parseInt(withdrawUSDAmount),
          SignatureContent,
          signature
        )
        .send({ from: account });
      console.log(tx, "DONE");
      console.log("Success");
    } catch (error) {
      console.log(error);
      toast.error("Erronr in withdraw collateral USD");
    }
    setLoading(false);
  };

  return (
    <div className="mt-8 w-full p-4 md:w-1/2 mx-auto flex flex-col space-y-8">
      <div className="space-y-4 flex flex-col md:flex-row justify-between">
        <form className="p-4 space-y-4" onSubmit={depositCollateralXDC}>
          <input
            type="text"
            name="XDC"
            value={XDC}
            onChange={(e) => setXDC(e.target.value)}
          ></input>
          {loading === "depositCollateralXDC" ? (
            <Loader />
          ) : (
            <button>Deposit Collateral XDC</button>
          )}
        </form>

        <form className="p-4 space-y-4" onSubmit={withdrawCollateralXDC}>
          <input
            type="text"
            name="XDC"
            value={withdrawXDC}
            onChange={(e) => setWithdrawXDC(e.target.value)}
          ></input>
          {loading === "withdrawCollateralXDC" ? (
            <Loader />
          ) : (
            <button>Withdraw Collateral XDC</button>
          )}
        </form>
      </div>

      <form className="p-4 space-y-4" onSubmit={borrow}>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <div
          onChange={(e) => setCurrency(e.target.value)}
          className="w-64 mx-auto flex justify-between"
        >
          <div className="">
            <input
              type="radio"
              name="currency"
              value={0}
              checked={currency === 0}
            ></input>
            <div>XDC</div>
          </div>
          <div>
            <input className="" type="radio" name="currency" value={1}></input>
            <div>USD</div>
          </div>
        </div>
        {loading === "borrow" ? <Loader /> : <button>Borrow</button>}
      </form>

      <div className="space-y-4 flex flex-col md:flex-row justify-between">
        <form className="p-4 space-y-4" onSubmit={depositCollateralUSD}>
          <input
            type="number"
            name="USDs"
            value={USDAmount}
            onChange={(e) => setUSDAmount(e.target.value)}
          ></input>
          {loading === "depositCollateralUSD" ? (
            <Loader />
          ) : (
            <button>Deposit Collateral USD</button>
          )}
        </form>

        <form className="p-4 space-y-4" onSubmit={withdrawCollateralUSD}>
          <input
            type="number"
            name="USDs"
            value={withdrawUSDAmount}
            onChange={(e) => setWithdrawUSDAmount(e.target.value)}
          ></input>
          {loading === "withdrawCollateralUSD" ? (
            <Loader />
          ) : (
            <button>Withdraw Collateral USD</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
