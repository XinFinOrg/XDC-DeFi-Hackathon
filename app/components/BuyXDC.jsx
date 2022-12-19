import React, { useState } from "react";
import coinImage from "../assets/coin.png";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { Transition } from "@headlessui/react";
import Link from "next/link";

export default function BuyXDC() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=" md:mt4 flex justify-center lg:justify-around items-center flex-wrap-reverse text-white">
      <div className="">
        <h2 className="text-4xl text-skin-base my-4 tracking-wide leading-tight lg:text-5xl mb-6">
          XDC
          <br />
          Stable<span className="text-orange-400">Coin</span>
        </h2>
        <p className="text-base text-skin-muted dark:text-skin-darkMuted lg:text-2xl sm:mb-14 lg:mb-8">
          Price: $0.0989
        </p>
        <button
          type="button"
          className=" flex hover:scale-105 mt-8 transition ease-in-out items-center bg-gray-900 text-white border hover:border-gray-300 rounded-sm text-lg hover:bg-orange-500 font-semibold font-fredoka hover:text-white px-3 py-2 mr-2 mb-2"
          onClick={() => setShowModal(!showModal)}
        >
          <img
            className="  w-8 mr-2"
            src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-wallet-interface-kiranshastry-lineal-kiranshastry.png"
          />
          Buy XDC
        </button>
      </div>
      <div className="  md:w-1/3 mx-auto md:mx-0 lg:my-8 mt-0 order-2 ">
        <Image className="" src={coinImage} alt="CoinImage" />
      </div>

      <Transition
        show={showModal}
        enter="transform transition duration-[500ms] ease-in"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-[300ms] transition ease-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-0 "
        className=" w-full min-h-screen bg-gray-900 bg-opacity-80 backdrop-blur-sm fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      >
        <div
          className=" fle flex flex-col x justify-center items-center w-11/12
            border rounded-lg border-gray-500 px-4 py-6 bg-transparent backdrop-blur-xl bg-shade-bg sm:max-w-full  h-1/2 sm:w-1/2 sm:h-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <p className="sm:mb-4 mb-6 text-lg md:w-full w-52  text-center">
            Enter Amount to get XDC-Stable coin
          </p>
          <div className=" flex items-center justify-center mt-4">
            <input
              type="number"
              id=""
              className={`
                     bg-gray-800 text-white border w-40 lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="0"
              required
            />
            {/* <p className=" md:pl-5 pl-3 md:w-44 ">XDC Coin</p> */}
          </div>
          <a
            className="self-center text-center fixed z-50 top-1 sm:left-full left-[78%] rounded-full bg-white curosor-pointer md:ml-3 m-2 px-2 py-2 "
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <MdClose className="text-3xl text-black cursor-pointer" />
          </a>

          <button
            type="button"
            className=" mt-8 flex hover:scale-105 transition ease-in-out items-center bg-gray-900 text-white border hover:border-gray-300 rounded-sm text-lg hover:bg-orange-500 font-normal font-fredoka hover:text-black px-3 py-2 mb-2"
          >
            <img
              className=" w-6 mr-2"
              src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-wallet-interface-kiranshastry-lineal-kiranshastry.png"
            />
            Purchase
          </button>
        </div>
      </Transition>
    </div>
  );
}

{
  /* 
<section className="font-fredoka px-2 py-20 text-white">
<div className="md:flex items-center justify-center ">
  <div className=" md:w-3/5 px-32 lg:pl-40">
    <h2 className="text-4xl text-skin-base my-4 tracking-wide leading-tight lg:text-5xl mb-6">
      XDC
      <br />
      Stable<span className="text-orange-400">Coin</span>
    </h2>
    <p className="text-base text-skin-muted dark:text-skin-darkMuted lg:text-2xl sm:mb-14 lg:mb-8">
      Price:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $0.0989
    </p>
    <div>
      <button
        type="button"
        className=" flex hover:scale-105 transition ease-in-out items-center bg-gray-900 text-white border hover:border-gray-300 rounded-sm text-lg hover:bg-orange-500 font-semibold font-fredoka hover:text-white px-3 py-2 mr-2 mb-2"
        onClick={() => setShowModal(!showModal)}
      >
        <img
          className=" w-8 mr-2"
          src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-wallet-interface-kiranshastry-lineal-kiranshastry.png"
        />
        Buy XDC
      </button>
     
    </div>
  </div>
  <div className="w-10/12 md:w-1/3 mx-auto md:mx-0 my-8 order-2 ">
    <Image src={coinImage} alt="CoinImage" />
  </div>
</div>
</section> */
}

{
  /*
   <Transition
show={showModal}
enter="transform transition duration-[500ms] ease-in"
enterFrom="opacity-0 scale-0"
enterTo="opacity-100 rotate-0 scale-100"
leave="transform duration-[300ms] transition ease-out"
leaveFrom="opacity-100 rotate-0 scale-100 "
leaveTo="opacity-0 scale-0 "
className=" 
w-[100vw] h-[100vh] bg-gray-900 bg-opacity-80 backdrop-blur-sm fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
>
<div className=" fle flex flex-col x justify-center items-center
       border rounded-lg border-gray-500 px-4 py-6 bg-transparent backdrop-blur-xl

bg-shade-bg sm:max-w-full  h-1/2 sm:w-1/2 sm:h-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
  <p className="sm:mb-4 mb-6 text-lg">
    Enter Amount of XDC Stable coin
  </p>
  <div className=" px-2 flex flex-col sm:flex-row justify-center items-center">
   

    <input
      type="number"
      id=""
      className={`
      mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      placeholder="0"
      required
    />
    <p className=" ">XDC Coin</p>
    <a
      className="self-center text-center fixed z-50 top-1 sm:left-full left-[78%] rounded-full ml-3 bg-white curosor-pointer px-2 py-2 "
      onClick={() => {
        setShowModal(!showModal);
      }}
    >
      <MdClose className="text-4xl text-black cursor-pointer" />
    </a>
  </div>
  <a className="play-btn text-center py-4 w-[80%] sm:w-[35%] block animate-text cursor-pointer hover:animate-text-hover text-2xl mt-10 border-2 hover:bg-[#3E6B89]">
    Buy
  </a>
</div>
</Transition> */
}
