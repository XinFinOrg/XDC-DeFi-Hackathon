import Image from "next/image";
import Link from "next/link";
import { useState ,useEffect,useContext} from "react";
import Logo from "../public/MB.png";
import GlowingBtn from "../utils/glowingBtn";
import { DataContext } from "../utils/Context";
const HamIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="24"
      height="24"
      fill="#d4d0d0"
      className="text-white"
      viewBox="0 0 122 103.609"
      enableBackground="new 0 0 122.879 103.609"
    >
      <g>
        <path
          fillRule="evenodd"
          clipule="evenodd"
          d="M10.368,0h102.144c5.703,0,10.367,4.665,10.367,10.367v0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,20.735,0,16.07,0,10.368v0C0,4.665,4.666,0,10.368,0L10.368,0z M10.368,82.875 h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0c0,5.702-4.664,10.367-10.367,10.367H10.368C4.666,103.609,0,98.944,0,93.242l0,0 C0,87.54,4.666,82.875,10.368,82.875L10.368,82.875z M10.368,41.438h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,62.173,0,57.507,0,51.805l0,0C0,46.103,4.666,41.438,10.368,41.438 L10.368,41.438z"
        />
      </g>
    </svg>
  );
};

export default function Navbar() {
  const [isNavOpen, setNavOpen] = useState(false);
  const [getDimensions,setDimensions] = useState("");
  const {walletConnection,currentAccount} = useContext(DataContext);
  
  // useEffect(()=>{
  //   function getDimensions(){

  //   }


  // })

  const handleOnClick = () => {
    setNavOpen(true);
  };
  return (
    <>
      <nav className="bg-dk-bluish h-20 flex flex-row items-center px-8 justify-between ">

        <div className="lg:flex lg:flex-row lg:justify-between ">
        <Image src={Logo} width={120} height={60} alt="logo" />

        <ul className="hidden font-header lg:flex lg:flex-row lg:px-8 mt-4">
        <li className="pl-2 cursor-pointer mx-2 "><Link href="#">Home</Link></li>
            <li className="pl-2 cursor-pointer mx-2 "><Link href="#vision">Vision</Link></li>
       
            <li className="pl-2 cursor-pointer mx-2 "><Link href="#services"services>Services</Link></li>
            <li className="pl-2 cursor-pointer mx-2 "><Link href="#contact">Contact</Link></li>
        </ul>
        </div>
        <button className="lg:hidden cursor-pointer p-0" onClick={handleOnClick}>
          <HamIcon />
        </button>
        
        <div className="hidden lg:flex lg:flex-row lg:justify-between">
        <button className="font-bold font-fontDM font-xl  text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
        animate-glow bg-300 border-2 border-black p-3 px-5 mt-1 rounded-full"> <Link href="/launch">Launch DApp</Link> </button>
        </div>
      </nav>

      {isNavOpen ? (
        <div
          className="z-10 fixed w-80 h-screen flex bg-white justify-start pl-8
        pt-5 right-0 top-0 text-black"
        >
          <ul>
            <li className="pb-2 cursor-pointer ">Home</li>
            <li className="pb-2 cursor-pointer ">About</li>
            <li className="pb-2 cursor-pointer ">Vision</li>
            <li className="pb-2 cursor-pointer ">News</li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
