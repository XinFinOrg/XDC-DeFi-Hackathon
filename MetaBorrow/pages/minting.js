import React,{useContext, useState} from 'react'
import img from "../public/asset.jpeg";
import Image from 'next/image';
import ak from  "../public/nfts/ak47.jpeg";
import aventador from "../public/nfts/aventador.jpeg";
import boston from "../public/nfts/boston.jpg";
import bugatti from "../public/nfts/bugatti.jpeg";
import desert_eagle from "../public/nfts/desert_eagle.jpeg";
import ktpo from "../public/nfts/ktpo.jpeg";
import rr from "../public/nfts/rolls_roycee.jpeg";
import { DataContext } from '../utils/Context';

const nfts=[
    {
        name: "AK47",
        image: ak,
        img:"https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/ak47.jpeg",
        tokenId: "1",
        "description?": "AK47 (Rare Weapon)",
        properties:[{game:"gta 5"},{accuracy:"6"},{power:"7"},{reloadTime:"4ms"},{magCap:"30 Rounds"},{availableMag:"25 Rounds"}]
      },{
        name: "Lamborghini Aventador",
        image: aventador,
        img:"https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/aventador.jpeg",
        tokenId: "2",
        "description?": "Showroom",
        properties:[{game:"gta 5"},{health:"10"},{horsePower:"544 KW"},{seatCap:"2"},{fuelCap:"85"},{availableFuel:"60"}]
      },{
        name: "Boston Apartment",
        image: boston,
        img:"https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/boston.jpg",
        tokenId: "3",
        "description?": "Medium apartment in Boston",
        properties:[{game:"gta 5"},{health:"8"},{capacity:"6"},{loaction:"8"},{quality:"medium"}]
      },{
        name: "Bugatti",
        image: bugatti,
        img:"https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/bugatti.jpeg",
        tokenId: "4",
        "description?": "What color is your Bugatti?",
        properties:[{game:"gta 5"},{health:"7"},{horsePower:"650 KW"},{seatCap:"2"},{fuelCap:"90"},{availableFuel:"80"}]
      },{
        name: "Desert Eagle",
        image: desert_eagle,
        img:"https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/desert_eagle.jpeg",
        tokenId: "5",
        "description?": "Used by James Bond himself!",
        properties:[{game:"gta 5"},{accuracy:"8"},{power:"8"},{reloadTime:"2ms"},{magCap:"7 Rounds"},{availableMag:"5 Rounds"}]
      },{
        name: "KTPO",
        image: ktpo,
        img:"https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/ktpo.jpeg",
        tokenId: "6",
        "description?": "Hosted ETHIndia 2022",
        properties:[{game:"gta 5"},{health:"9"},{capacity:"3000"},{loaction:"7"},{quality:"premium"}]
      },{
        name: "Rolls Royce Phantom 5",
        image: rr,
        img:"https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/rolls_roycee.jpeg",
        tokenId: "7",
        "description?": "The Spirit of Ecstacy",
        properties:[{game:"gta 5"},{health:"7"},{horsePower:"320 KW"},{seatCap:"4"},{fuelCap:"80"},{availableFuel:"40"}]
      }
]
const Mint = () => {
    const {mintNft,
        getchSingleNft,
        getAllNftsByCollectionId,
        setName,
        setDesc,
        setImage}= useContext(DataContext);
        const [isLoading,setIsLoading]=useState(false);

  return (
    <>
      <div className="bg-vision h-[100]">
        <h1 className="text-3xl leading-7 pb-6 font-header text-center  p-5">
            Available Gaming Assets 
          </h1>
        <div className="grid grid-cols-4">
        {nfts.map((item,i)=>{
            const {name,image,tokenId}=item;
            return (<div key={i} className="bg-dk-bluish border border-white m-4 md:p-2 md:m-8 rounded-lg "  style={{position:"relative"}}>
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
    
            <Image src = {image} alt="mig" />
            </div>
            <h2 className="text-white md:text-2xl font-bold font-fontDM text-center pt-4">{name}</h2>
            <button className="font-bold font-fontDM font-xl mt-2 text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
            animate-glow bg-300 border-2 border-black p-3 px-5 mt-4 rounded-full" onClick={async ()=>{
                setIsLoading(true);
                console.log(item)
                await mintNft(item.name,item.img,item.tokenId,item['description?'],item.properties);
                setIsLoading(false);

            }} style={{position:"absolute",bottom:"-26px"}}> Mint</button>
            </div>);
        })}
      </div></div>
       
    
    </>
  )
}

export default Mint