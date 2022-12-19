import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from '../styles/Home.module.css'
import BuyXDC from "../components/BuyXDC";

export default function Coin() {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`w-screen min-h-screen flex items-center flex-col justify-between no-repeat bg-cover ${
        !expand ? `${styles.bg}` : `bg-[#03071E]`
      }`}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : <BuyXDC />}
      <div className=" w-full">
      <Footer />

      </div>
    </div>
  );
}
