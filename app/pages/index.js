import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";
import coin from "../assets/coin.png";
import Loader from "../components/Loader";
import { Toast } from "flowbite-react";
// import { fetchPrice } from "../api";

import Prism from "prismjs";

import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-markdown.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export default function Home() {
  const [expand, setExpand] = useState(false);

  const howToInstall = `
  npm i xdefi-contract 
  or
  yarn add xdefi-contracts
  `;

  const howToUse = `
  import "xdefi-contracts/Core/XSwapPair.sol" ;

  contract myDefiContract is XSwapPair {
    // ready to use the contracts
  }
  `;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <div
        className={`w-screen min-h- pb-20 md:pb-0 lg:min-h-max no-repeat bg-cover ${
          !expand
            ? `${styles.bg} bg-[url('../assets/landing.png')] bg-cover lg:bg-center bg-no-repeat`
            : `bg-[#03071E]`
        }`}
      >
        {/* <Loader /> */}
        <Navbar expand={expand} setExpand={setExpand} />
        {expand ? null : (
          <>
            <div className="mt-20 lg:ml-12 lg:mt-48 lg:pb-48 flex items-center lg:justify-start justify-around flex-wrap-reverse">
              <div className="font-fredoka mt-8 tracking-wide text-white flex flex-col items-start justify-center  px-14">
                <h1 className="text-4xl mb-2">XDC-DEX</h1>
                <p className="text-xl ">Swap your XDC tokens to ETH</p>
                <Link href="/swap">
                  {/* <button className="border-2 py-2 px-4 rounded-sm mt-5 font-chakra bg-white text-black hover:bg-transparent hover:text-white">
                Launch App
              </button> */}

                  <button
                    type="button"
                    className=" mt-5 flex hover:scale-105 transition ease-in-out items-center bg-gray-900 text-white border hover:border-gray-300 rounded-sm text-lg hover:bg-orange-500 font-semibold font-fredoka hover:text-black px-3 py-2 mr-2 mb-2"
                  >
                    {/* <img
                  className=" w-8 mr-2"
                  src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-wallet-interface-kiranshastry-lineal-kiranshastry.png"
                /> */}
                    Launch App
                  </button>
                </Link>
              </div>
              <div className="lg:hidden animate-pulse  max-w-md">
                <Image alt="image" src={coin} />
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={`w-screen min-h-scree bg-[#03071E] no-repeat bg-cover text-center pt-10  flex items-center justify-center flex-col ${
          !expand
            ? `${styles.bg2} bg-cover lg:bg-center bg-no-repeat`
            : `bg-[#03071E]`
        }`}
      >
        <div className="text-white w-full my-5 flex flex-col justify-center items-center mb-12 z-[1] lg:mb-20">
          <h1 className=" text-3xl font-semiobold"> Our Main Features</h1>
          <div className="w-11/12 grid md:grid-cols-3   md:gap-4 gap-3 mt-8  rounded-md">
            <div className=" border px-6 py-10  bg-[#fc6f38] text-gray-800">
              <h1 className=" text-2xl font-semibold mb-4 underline">
                Swapping
              </h1>
              <p>
                XDC-Fi consists of an entire swap that allows you to swap your
                tokens in the smoothest way possible, giving you a uniswap like
                swapping experience
              </p>
            </div>
            <div className=" border px-6 py-10 bg-[#03071E]">
              <h1 className=" text-2xl font-semibold mb-4 underline">
                Liquidity Pools
              </h1>
              <p>
                XDC-Fi allows users to create pool as well as adding and
                removing liquidity with three different tokens by depositing
                amount.
              </p>
            </div>
            <div className=" border px-6 py-10 bg-[#fc6f38] text-gray-800 ">
              <h1 className=" text-2xl font-semibold mb-4 underline">
                Staking
              </h1>
              <p>
                XDC-Fi allows you to stake your tokens in the smart contract as
                well as unstake them whenever needed, it also allows you to
                claim the rewards whenever the user wished.
              </p>
            </div>
            <div className=" border px-6 py-10 bg-[#03071E]">
              <h1 className=" text-2xl font-semibold mb-4 underline">
                Lending
              </h1>
              <p>
                XDC-Fi allows users to lend different tokens including customly
                deployed ones, users can also borrow, withdraw, Repay and supply
                tokens by interacting with the lending-contract.
              </p>
            </div>
            <div className=" border px-6 py-10 bg-[#fc6f38] text-gray-800">
              <h1 className=" text-2xl font-semibold mb-4 underline">
                Stable Coin
              </h1>
              <p>
                XDC-Fi stableCoin allows users to get 1 USD worth of XDC tokens
                by fetching the price from the coingecko api. In the future this
                feature will be improved on a lot.
              </p>
            </div>
            <div className=" border px-6 py-10 bg-[#03071E]">
              <h1 className=" text-2xl font-semibold mb-4 underline">
                Price Oracle
              </h1>
              <p>
                XDC-Fi has on chain pricefeeds from the pools not making users
                reliant on other protocols at all and simplifying the process
                with this feature.
              </p>
            </div>
          </div>
        </div>

        {/* <Toast>
          <div className="ml-3 text-sm font-normal">
            Item moved successfully.
          </div>
          <Toast.Toggle />
        </Toast> */}

        <div className="text-white w-full my-5 flex flex-col lg:mt-12 mt-20 justify-center items-center mb-12 z-[1] lg:mb-20">
          <h1 className=" text-3xl font-semiobold"> Build with XDC-Fi</h1>
          <div className="w-11/12 flex flex-wrap justify-around items-center mt-8 px-6 py-8 rounded-md backdrop-blur-2xl">
            <div className=" flex flex-col justify-start items-start flex-wrap">
              <p className=" text-justify max-w-xl">
                We also built a collection of contract-based layer as an
                npm-package that anyone can use to build DeFi based applicions
                on top of XDC-Chain
              </p>
              <button
                type="button"
                className="text-white  mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mb-2"
              >
                <a
                  href="https://www.npmjs.com/package/xdefi-contracts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Package
                </a>
              </button>
            </div>
            <div>
              <span className=" ">
                <pre className="  ">
                  <code className="language-jsx">{howToInstall}</code>
                  <code className="language-jsx">{howToUse}</code>
                </pre>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-ful">{expand ? null : <Footer />}</div>
    </>
  );
}
