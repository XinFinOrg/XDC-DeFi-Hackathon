import Image from "next/image";
import Link from "next/link";
export default function GamesCard({ gameName, imgSrc }) {
  return (
    <div className="relative w-full h-[10rem] rounded-lg m-8">
      <div className="imgWrapper w-full h-[180px] lg:w-3/4 mr-4 rounded-lg cursor-pointer hover:opacity-70">
        <Image src={imgSrc} alt="gameImg" layout="fill" objectFit="cover" />
        <style jsx>
          {`
            .imgWrapper {
              position: absolute;
              opacity: 0.5;
            }

            div > span {
              border-radius: 10px;
            }
          `}
        </style>
      </div>
      
       <h2 className="font-fontDM text-2xl text-white" style={{marginTop:"175px !important"}}><Link href="/auth">{gameName}</Link> </h2>
       {/* <Link href="/minting" className="mt-12">GO</Link> */}
    
      
    </div>
  );
}
