import Image from "next/image";
import Bg from "../public/bgpic.png";
import GlowingBtn from "../utils/glowingBtn";
import CardsWrapper from "./CardsWrapper";
import { Circular } from "../utils/CircularAnimation";

const BackgroundImg = () => {
  return (
    <div className="absolute -z-1 w-full h-full">
      <Image src={Bg} layout="fill" objectFit="cover" alt="bg" />
      <style jsx>
        {`
          div {
            z-index: -1;
          }
        `}
      </style>
    </div>
  );
};


export default function HeroSection() {
  return (
    <div className="relative z-5 h-[90rem] sm:h-[60rem]  lg:h-[48rem]" id="hero-section">
      <BackgroundImg />
      <div className=" pb-16 p-16">
        <section className=" z-5 text-white p-14 text-center flex flex-col items-center">
          <h1 className="text-3xl leading-7 pb-6 font-header">
            MONETIZE YOUR GAMING ASSETS
          </h1>
          <div>
          <p className="font-extralight text-lg leading-8 font-fontJost">
            MetaBorrow serves as a multi chain renting protocol that lets you unlock the true potential of your in-game digital assets.
          </p>
          </div>
         
        </section>

        
      </div>

      <CardsWrapper />
    </div>
  );
}
