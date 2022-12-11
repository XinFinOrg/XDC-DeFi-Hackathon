import Image from "next/image";
import Bg from "../public/bgpic.png";
import croppedLogo from '../public/croppedLogo.png';

const BackgroundImg = () => {
    return (
      <div className="absolute -z-1 w-full h-full" id="contact">
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
  
export default function Community(){
    return(
        <div className="relative grid place-content-center  h-[16rem]">
            <BackgroundImg />
            <div className="relative w-full flex flex-col items-center  p-4 bg-comm rounded-xl border-2 border-white text-center">
                {/* <div className="cropWrapper opacity-50">
                <style jsx>
                    {
                        `
                            .cropWrapper{
                                position:absolute;

                            }
                        `
                    }
                </style>
            <Image src={croppedLogo} alt="crop" width={100} height={100} />

                </div> */}
             <h2 className="text-xl lg:text-3xl font-bold font-header pl-4">Join Our Community on Twitter</h2>
             <button className="border-none bg-white text-black p-4 mt-4 rounded-2xl font-fontJost transition-all hover:bg-[#223354] hover:text-white">Join us on Twitter</button>
            </div>
        </div>
    )
}