import Image from "next/image";
import Link from "next/link";
import Logo from "../public/MB.png";
import twitIcon from "../public/social/Twitter.webp";
import linkIcon from "../public/social/linkedin.webp";

const FooterLink = ({ linkName }) => {
  return (
    <a href="#" className="text-gray-400 hover:text-[#0FDCC2]">
      {linkName}
    </a>
  );
};

export default function Footer() {
  return (
    <div className="bg-vision p-8 lg:p-12 lg:flex lg:flex-row lg:justify-between
    ">
      <div className="">
        <Image src={Logo} width={150} height={80} alt="Logo" />
        <p className="font-fontDM pt-2">
        Welcome to the Gaming DeFi future!
        </p>
      </div>

      <div className="flex flex-col font-fontDM pt-8">
        <h2 className="font-bold font-xl">Company</h2>
        <FooterLink linkName="Home" />
        <FooterLink linkName="About" />
        <FooterLink linkName="Vision" />
        <FooterLink linkName="News" />
      </div>

      <div className="flex flex-col font-fontDM pt-8">
        <h2 className="font-bold font-xl">Follow Us</h2>
        <span className="flex flex-row items-center justify-content-between">
          <Image src={twitIcon}  width={24} height={24} alt="twit" />
          <FooterLink linkName="Twitter" />
        </span>
        <span className="flex flex-row items-center">
          <Image src={linkIcon} width={24} height={24}  alt="link" />
        <FooterLink linkName="Linkedin" />
        </span>
      </div>


      <div className="flex flex-col font-fontDM pt-8 pb-4">
      <h2 className="font-bold font-2xl pb-4">Signup for the Newsletter</h2>
      <input type="text" className="rounded-lg"/>
      <button className="bg-[#374A5E] mt-4 rounded-lg">Sign up</button>
      </div>
    </div>
  );
}
