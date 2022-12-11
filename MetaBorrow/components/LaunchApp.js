import React, { useState, useContext } from 'react'
import GlowingBtn from "../utils/glowingBtn";
import img from "../public/asset.jpeg";
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Image from 'next/image';
import ak from "../public/nfts/ak47.jpeg";
import aventador from "../public/nfts/aventador.jpeg";
import boston from "../public/nfts/boston.jpg";
import bugatti from "../public/nfts/bugatti.jpeg";
import desert_eagle from "../public/nfts/desert_eagle.jpeg";
import ktpo from "../public/nfts/ktpo.jpeg";
import rr from "../public/nfts/rolls_roycee.jpeg";
import { DataContext } from "../utils/Context";

const LaunchApp = () => {
    const [lendData, setLendData] = useState({
        amount: "",
        duration: "",
        borrowPrice: "",
        collaterral: ""
    });
    const { walletConnection, currentAccount } = useContext(DataContext);
    const onChangingLendDetails = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLendData({ ...lendData, [name]: value });

    }
    const [category, setCategory] = useState("rent");

    const nfts = [
        {
            name: "AK47",
            image: ak,
            img: "https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/ak47.jpeg",
            tokenId: "1",
            category: "rent",
            "description?": "AK47 (Rare Weapon)",
            properties: [{ game: "gta 5" }, { accuracy: "6" }, { power: "7" }, { reloadTime: "4ms" }, { magCap: "30 Rounds" }, { availableMag: "25 Rounds" }]
        }, {
            name: "Lamborghini Aventador",
            image: aventador,
            img: "https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/aventador.jpeg",
            tokenId: "2",
            category: "lend",
            "description?": "Showroom",
            properties: [{ game: "gta 5" }, { health: "10" }, { horsePower: "544 KW" }, { seatCap: "2" }, { fuelCap: "85" }, { availableFuel: "60" }]
        }, {
            name: "Boston Apartment",
            image: boston,
            img: "https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/boston.jpg",
            tokenId: "3",
            category: "rent",
            "description?": "Medium apartment in Boston",
            properties: [{ game: "gta 5" }, { health: "8" }, { capacity: "6" }, { loaction: "8" }, { quality: "medium" }]
        }, {
            name: "Bugatti",
            image: bugatti,
            img: "https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/bugatti.jpeg",
            tokenId: "4",
            category: "rent",
            "description?": "What color is your Bugatti?",
            properties: [{ game: "gta 5" }, { health: "7" }, { horsePower: "650 KW" }, { seatCap: "2" }, { fuelCap: "90" }, { availableFuel: "80" }]
        }, {
            name: "Desert Eagle",
            image: desert_eagle,
            img: "https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/desert_eagle.jpeg",
            tokenId: "5",
            category: "lend",
            "description?": "Used by James Bond himself!",
            properties: [{ game: "gta 5" }, { accuracy: "8" }, { power: "8" }, { reloadTime: "2ms" }, { magCap: "7 Rounds" }, { availableMag: "5 Rounds" }]
        }, {
            name: "KTPO",
            image: ktpo,
            img: "https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/ktpo.jpeg",
            tokenId: "6",
            category: "rent",
            "description?": "Hosted ETHIndia 2022",
            properties: [{ game: "gta 5" }, { health: "9" }, { capacity: "3000" }, { loaction: "7" }, { quality: "premium" }]
        }, {
            name: "Rolls Royce Phantom 5",
            image: rr,
            img: "https://gateway.pinata.cloud/ipfs/QmfNvXret5ftt7bkhZip1twFSTdX1i5teNK36p2B4MS5Az/rolls_roycee.jpeg",
            tokenId: "7",
            category: "lend",
            "description?": "The Spirit of Ecstacy",
            properties: [{ game: "gta 5" }, { health: "7" }, { horsePower: "320 KW" }, { seatCap: "4" }, { fuelCap: "80" }, { availableFuel: "40" }]
        }
    ]

    return (
        <><nav className="bg-dk-bluish h-20 flex flex-row items-center px-8 justify-between "><div className="lg:flex lg:flex-row lg:justify-between ">


            <ul className="hidden font-header lg:flex lg:flex-row lg:px-8 mt-3 ">
                <li className="pl-2 cursor-pointer mx-2 " onClick={() => {
                    setCategory("rent");
                }}>Rent</li>
                <li className="pl-2 cursor-pointer mx-2 " onClick={() => {
                    setCategory("lend");
                }}>Lend</li>
                <li className="pl-2 cursor-pointer mx-2 "><Link href="/dashboard">Dashboard</Link></li>
            </ul>
        </div>
            {currentAccount ? <GlowingBtn btnName={currentAccount} /> : <GlowingBtn btnName="Connect Wallet" onClick={() => {
                walletConnection();
            }} />}
        </nav>
            <div className="grid grid-cols-4">
                {nfts.filter((item) => item.category === category).map((item, i) => {
                    const { name, image, tokenId } = item;
                    return (<div key={i} className="bg-dk-bluish border border-white m-4 md:p-2 md:m-8 rounded-lg " style={{ position: "relative" }}>
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

                            <Image src={image} alt="mig" />
                        </div>
                        <h2 className="text-white md:text-2xl font-bold font-fontDM text-center pt-4 mb-5">{name} #{tokenId}</h2>

                        {category === "rent" ?  <Popup trigger={<button className="font-bold font-fontDM font-xl mt-2 text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
            animate-glow bg-300 border-2 border-black p-3 px-5 mt-4 rounded-full" style={{ position: "absolute", bottom: "-26px" }}>Available </button>}
                            position="right center">
                            <div className="bg-vision px-3 lg:py-6 relative font-fontDM " style={{ width: "300px" }} id="vision">


                                <div className="flex flex-col font-fontDM pt-8 pb-4 px-2">

                                    <input type="number" style={{ color: "black !important" }}className="rounded-sm mt-3 p-3" placeholder="Rent Duration" />
                                    



                                    <button className="font-bold font-fontDM font-xl mt-5  text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
        animate-glow bg-300 border-2 border-black p-3 px-5 mt-1 rounded-lg mt-4" onClick={(e) => {
                                            console.log(lendData)
                                        }}> Rent Now</button>
                                </div>

                            </div>
                        </Popup> : <Popup trigger={<button className="font-bold font-fontDM font-xl mt-2 text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
            animate-glow bg-300 border-2 border-black p-3 px-5 mt-4 rounded-full" style={{ position: "absolute", bottom: "-26px" }}>Lend Nft </button>}
                            position="right center">
                            <div className="bg-vision px-3 lg:py-6 relative font-fontDM " style={{ width: "300px" }} id="vision">


                                <div className="flex flex-col font-fontDM pt-8 pb-4 px-2">

                                    <input type="number" style={{ color: "black !important" }} value={lendData.amount} name="amount" onChange={onChangingLendDetails} className="rounded-sm mt-3 p-3" placeholder="Amount" />
                                    <input type="number" style={{ color: "black !important" }} value={lendData.duration} name="duration" onChange={onChangingLendDetails} className="rounded-sm mt-3 p-3" placeholder="Max Lend Duration" />
                                    <input type="number" style={{ color: "black !important" }} value={lendData.borrowPrice} name="borrowPrice" onChange={onChangingLendDetails} className="rounded-sm mt-3 p-3" placeholder="Rent Price" />
                                    <label for="collaterral" className="mt-4">Choose a Payment Token:</label>

                                    <select name="collaterral" style={{ color: "black !important" }} value={lendData.collaterral} onChange={onChangingLendDetails} className="mt-2" id="collaterral">
                                        <option value="0.01">0.01 WETH</option>
                                        <option value="0">No Collateral</option>
                                    </select>



                                    <button className="font-bold font-fontDM font-xl mt-5  text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
        animate-glow bg-300 border-2 border-black p-3 px-5 mt-1 rounded-lg mt-4" onClick={(e) => {
                                            console.log(lendData)
                                        }}> Lend</button>
                                </div>

                            </div>
                        </Popup>}

                    </div>);
                })}
            </div>

        </>
    )
}

export default LaunchApp