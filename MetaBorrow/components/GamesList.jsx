
import imageOne from '../public/games/VALORANT.jpg';
import imageTwo from '../public/games/CS.jpeg';
import imageThree from '../public/games/VICECITY.jpeg';
import imageFour from '../public/games/MINECRAFT.jpeg';
import imageFive from '../public/games/FIFA.jpeg';
import imageSix from '../public/games/six.webp';
import GamesCard from './GamesCard';
import forza from '../public/games/forza.jpeg';
import upland from '../public/games/upland.png';
import god from '../public/games/god.jpeg';
import star from '../public/games/star.jpeg';
import fortnite from '../public/games/fortnite.jpeg'
import illuvion from '../public/games/illuvion.jpeg';
import Link from 'next/link';
const gamesList = [
   
    {
        imgSrc:imageOne,
        gameName:"Valorant"
    },
    {
        imgSrc:imageTwo,
        gameName:"Call of Duty: Online"
    },
    {
        imgSrc:imageThree,
        gameName:"GTA Online"
    },
    {
        imgSrc:imageFour,
        gameName:"Minecraft"
    },
    {
        imgSrc:imageFive,
        gameName:"EA Sports FIFA 22"
    },
    {
        imgSrc:imageSix,
        gameName:"Axie Infinity"
    },{
        imgSrc:upland,
        gameName:"Upland"
    },
    {
        imgSrc:illuvion,
        gameName:"Illuvium"
    },
    {
        imgSrc:fortnite,
        gameName:"Fortnite"
    },
    {
        imgSrc:star,
        gameName:"Star Atlas"
    },
    {
        imgSrc:forza,
        gameName:"Forza Horizon"
    },
    {
        imgSrc:god,
        gameName:"God of War"
    }

]

export default function GamesList(){
    return(
    <div className="bg-vision p-12">
    <div className="flex flex-col items-center text-center" id="services">
        <h1 className="font-header text-3xl pb-8">Wall of Games </h1>
        <p className="font-fontJost ">Through ownership and rewarding merit, games are now governed by the players. Innovative in-game economics reward players for their performance, creating a new economy in the Metaverse.</p>
    </div>

    <div className='flex flex-col items-center lg:grid lg:grid-cols-3'>
        {
            gamesList.map(el=>{
                return(
                   <GamesCard imgSrc={el.imgSrc} gameName={el.gameName} key={el.gameName} />
                )
            })
        }
    </div>
    </div>
    )
}