import Link from "next/link";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import logo from "../assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar(props) {
  // --------- States here ------------- //
  const { expand, setExpand } = props;
  return (
    <nav className="max-w-full border-b  z-[1000] border-gray-500 backdrop-blur-xl relative w-full flex justify-between items-center px-4 py-4 lg:flex lg:justify-around lg:px-0 font-plus  lg:items-center text-white">
      {!expand ? (
        <span
          className="self-center mlq-2 lg:hidden"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <BiMenu className="text-4xl" />
        </span>
      ) : (
        <span
          className="self-center text-center lg:hidden fixed left-[80%] z-50 rounded-full mx-5 border-2 px-2 py-2"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <MdClose className="text-xl text-white" />
        </span>
      )}
      <div className="flex justify-between w-[200px] -order-1 lg:w-72">
        <div className="  cursor-pointer">
          <Link href="/">
            <span className=" flex items-center justify-start space-x-2 w-auto tracking-wide text-2xl font-semibold text-[#fff4f0]">
              <Image width={40} src={logo} alt="logo" />
              <span className="mx-1">XDC-Fi</span>
            </span>
          </Link>
        </div>
      </div>
      <ul className="hidden lg:flex justify-around items-center basis-2/5 text-lg">
        
        <Link href="/tokens">
          <div className="cursor-pointer relative hover:animate-pulse group py-0.5 px-0.5 ">
            <div className="absolute -inset-1 blur-lg transition-all"></div>
            <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
              Tokens
            </button>
          </div>
        </Link>
        <Link href="/swap">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div className="absolute -inset-1 blur-lg transition-all"></div>
            <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
              Swap
            </button>
          </div>
        </Link>
        <Link href="/pool">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div className="absolute -inset-1 blur-lg transition-all"></div>
            <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
              Pool
            </button>
          </div>
        </Link>
        <Link href="/stake">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div className="absolute -inset-1 blur-lg transition-all"></div>
            <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
              Stake
            </button>
          </div>
        </Link>
        <Link href="/lending">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div className="absolute -inset-1 blur-lg transition-all"></div>
            <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
              Lending
            </button>
          </div>
        </Link>
        <Link href="/xdc">
          <div className="cursor-pointer relative hover:animate-pulse group py-0.5 px-0.5 ">
            <div className="absolute -inset-1 blur-lg transition-all"></div>
            <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
              Buy XDC
            </button>
          </div>
        </Link>
      </ul>
      <div className="hidden lg:flex items-center">
        <ConnectButton />
      </div>
      {/* --------------- Mobile and Tablets --------------- */}
      {/* ------------- Transition for Mobile Menu -------------- */}
      <Transition
        show={expand}
        enter="transition ease-out duration-1000 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="lg:hidden  w-screen h-screen fixed overflow-y left-0 top-0 z-10"
      >
        <div
          className="lg:hidden bg-[#03071E] flex flex-col items-center h-full px-4 w-full mt-16 py-12 md:px-8"
          id="mobile-menu"
        >
          <ul className=" flex flex-col text-center items-center justify-between basis-2/6 mt-14 mb-">
            
            <Link href="/tokens">
              <div className="cursor-pointer relative hover:animate-pulse group py-0.5 px-0.5 ">
                <div className="absolute -inset-1 blur-lg transition-all"></div>
                <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
                  Tokens
                </button>
              </div>
            </Link>
            <Link href="/swap">
              <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
                <div className="absolute -inset-1 blur-lg transition-all"></div>
                <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
                  Swap
                </button>
              </div>
            </Link>
            <Link href="/pool">
              <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
                <div className="absolute -inset-1 blur-lg transition-all"></div>
                <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
                  Pool
                </button>
              </div>
            </Link>
            <Link href="/stake">
              <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
                <div className="absolute -inset-1 blur-lg transition-all"></div>
                <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
                  Stake
                </button>
              </div>
            </Link>
            <Link href="/lending">
              <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
                <div className="absolute -inset-1 blur-lg transition-all"></div>
                <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
                  Lending
                </button>
              </div>
            </Link>
            <Link href="/xdc">
              <div className="cursor-pointer relative hover:animate-pulse group py-0.5 px-0.5 ">
                <div className="absolute -inset-1 blur-lg transition-all"></div>
                <button className="relative active:scale-x-105 border-[#D100D1] py-1 transition-all text-md">
                  Buy XDC
                </button>
              </div>
            </Link>
            {/* <Link href="/swap">
              <button
                className="cursor-pointer transition-all text-2xl mb-4"
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                App
              </button>
            </Link> */}
            <div className="flex items-center  ">
              <ConnectButton />
            </div>
          </ul>
        </div>
      </Transition>
    </nav>
  );
}
