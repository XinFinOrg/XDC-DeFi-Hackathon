import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from '../styles/Home.module.css'

export default function Tokens() {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
            ${!expand ? `${styles.bg2} bg-[url('../assets/dark.png')]` : `bg-[#03071E]`}
              `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <div className=" w-full flex justify-center items-start px-2 ">
          <div className="overflow-x-auto  relative max-w-full rounded-md mx-auto lg:mx-auto font-fredoka text-white px- py-0 bg-[#03071e68] opacity-100 backdrop-blur-lg flex flex-col items-center justify-center mt-32 md:mt-12 xl:mt-32 2xl:mt-40 mb-32 ">
            <h2 className=" rounded-t-md text-xl font-semibold tracking-wid w-full bg-[blue-700] py-4 px-4 border-b border-gray-400">
              Top tokens on XDCDEX
            </h2>
            <div className=" lg:px-4 py-8  ">
              <table className=" w-full text-sm text-left text-gray-100 ">
                <thead className=" text-sm uppercase  text-gray-100 border-b border-gray-500">
                  <tr cla>
                    <th scope="col" className="py-3 px-6">
                      Token
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Change
                    </th>
                    <th scope="col" className="py-3 px-6">
                      TVL
                    </th>
                    <th scope="col" className="py-3 px-6">
                      VOlume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" border-b border-gray-500 text-gray-100">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap "
                    >
                      XDC
                    </th>
                    <td className="py-4 px-6">$ 1,185.93</td>
                    <td className="py-4 px-6">-0.90%</td>
                    <td className="py-4 px-6">$ 800M</td>
                    <td className="py-4 px-6">
                      <a
                        className=""
                        target="_blankspace"
                        rel="noreferrer"
                        href="#"
                      >
                        $ 4.4M
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
