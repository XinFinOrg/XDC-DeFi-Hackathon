// import Head from 'next/head'
// import Image from 'next/image'
// import CardsWrapper from '../components/CardsWrapper'
// import Community from '../components/Community'
import GamesList from '../components/GamesList'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Recent from '../components/Recent'
import Vision from '../components/Vision'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <>
     <Navbar />
     <HeroSection />
     <Vision />
     <GamesList />
     <Recent />
     <Footer />
    </>
  )
}
