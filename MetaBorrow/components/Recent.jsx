import Image from "next/image"
import recentOne from '../public/recentone.webp';
import recentTwo from '../public/recenttwo.webp';
const cardArr = [
    {
        imgSrc:recentOne,
        content:"NFT Games changing way of playing games"
    },
    {
        imgSrc:recentTwo,
        content:"Syncity NFT Game Review"
    },{
        imgSrc:recentOne,
        content:"NFT Games changing way of playing games"
    },
    {
        imgSrc:recentTwo,
        content:"Syncity NFT Game Review"
    },
    
]

const RecentCard = ({imgSrc,content}) => {
    return(
        <div className="bg-white  p-4 m-4 md:p-8 md:m-8 rounded-lg ">
        <div className="imgWrapper ">
            <style jsx>
                {
                    `
                        .imgWrapper{
                            box-shadow: 9.899px 9.899px 30px 0 rgb(0 0 0 / 10%);
                            transition:all .4s ease;
                        }
                        .imgWrapper:hover{
                            opacity:0.5;
                            transform: scale(1.05) rotate(2deg);
                        }
                    `
                }
            </style>

        <Image src = {imgSrc} alt="mig" />
        </div>
        <h2 className="text-black md:text-2xl font-bold font-fontDM text-center pt-4">{content}</h2>
        </div>
    )
}

export default function Recent(){
    return(
     <div className="flex flex-col items-center bg-vision p-12">
         <section className="text-center">
            
             <h2 className="font-header font-bold text-xl pt-4">RECENT NEWS</h2>
         </section>

         <div className="grid grid-cols-2 ">
         {
             cardArr.map(el=> {
                 return(
                     <RecentCard imgSrc={el.imgSrc} content={el.content} key={el.content}/>
                 )
             })
         }
         </div>
     </div>
    )
}