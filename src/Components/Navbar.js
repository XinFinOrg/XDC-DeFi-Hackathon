import React, { useState , useEffect} from 'react'
import { ethers } from 'ethers';
import "../App.css"
import '../Css/Navbar.css'
// import '../CSS/Navbar.css'



export default function Navbar() {

    const [connectIs, setConnectIs] = useState("Connect")

    useEffect(() => {
    //   Connect()
    })
    
    async function Connect() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const myAddress = await signer.getAddress()
        // setMainAddress(myAddress)
        setConnectIs("Connected")
    }
    
  return (

    <div>
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> */}
        <nav className="navbar navbar-expand-lg bg-light ">
            <div className="container-fluid">

                {/* <a className="navbar-brand" href="/">Navbar</a> */}
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">Hello </span>
                </button> */}

                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/#/">Home</a>
                        {/* <link rel="stylesheet" href="/Home" /> */}
                        
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#/WXDC">WXDC</a>
                        {/* <Link className="nav-link" to="/CreateSBT">CreateSBT</Link> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/MintXinUSD">MintXinUSD</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/StackXinUSD">StackXinUSD</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/Analytics">Analytics</a>
                    </li>

             
                        
                    {/* <li lassName='nav-item1'>
                        <button className="connectBtn " onClick={Connect}>{connectIs}</button>
                            
                    </li> */}
                </ul>

                        
                </div>
            </div>
        </nav>  
    </div>
  )
}