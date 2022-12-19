import { Outlet, Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './single.css'
import {
    BrowserRouter as Router,

    Route,
    Routes,
    useParams,
} from "react-router-dom";
import { Web3ModalContext } from "../context/web3model";
import { abi,contractaddr } from "./abi"


function App() {
    const [aeSdk, setAeSdk] = useState(null);
    const [price, setprice] = useState();
    const [loans, setloan] = useState([])
    const { id } = useParams();
    const { account, connect, disconnect, web3 } = useContext(Web3ModalContext);

    async function Connectwallet() {




    }

    let payloann = async () => {
        try {

            document.getElementById("butto").innerHTML = `<span class="loading"></span>`
            let contract = await new web3.eth.Contract(abi, contractaddr);
            console.log(id)
            let loans = await contract.methods.repayloan(id).send({ from: account })

        }
        catch (err) {
            console.log(err.toString())
            if (err.toString() == `Error: Failed to check for transaction receipt:\n{}`) {
                document.getElementById("butto").innerHTML = `<span>Paid</span>`
                toast("Loan Payed Successfully");
            }
            else {
                console.log(err)
                toast("Error Occured");
                document.getElementById("butto").innerHTML = `<span>Pay Loan</span>`
            }

        }

    }
    useEffect(() => {
        // Update the document title using the browser API
        (async () => {

            let contract = await new web3.eth.Contract(abi, contractaddr);
            console.log(id)
            let loans = await contract.methods.loans(id).call()
            setloan(loans)
            console.log(loans)
            //   const users = await getloanbyid(id);
            //   console.log(users)
            //   setloan(users[0]);

        })();

        const getData = setTimeout(async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=aeternity&vs_currencies=usd');
            const price = await response.json();
            setprice(Number(price["aeternity"]["usd"] * 1000))
        })
    }, []);

    return (
        <div className="App">
            <div className="header">

                <h1>XDUSD</h1>

                <div class="linkhandler">

                    <div class="button-container" id="tsr">
                        <Link class="btn" id="linko" to="/loan"><span>Take  </span></Link>

                    </div>
                    <div class="lo-co" id="lo-co">
                        <div class="loaderr" id="loaderr"></div>
                    </div>
                    {!account ? (
                        <div class="button-container" id="wallet" onClick={Connectwallet}>

                            <a href="#" class="btn"><span>Connect</span></a>
                        </div>
                    ) : (
                        <div class="button-container" id="wallet" onClick={Connectwallet}>

                            <h4 style={{ "color": "white" }}>{account.replace("0x", "xdc").slice(0, 5) + "..." + account.slice(account.length - 5, account.length)}</h4>
                            <div class="button-container" id="tsr" style={{ display: "block", marginLeft: "20px" }}>
                                <Link class="btn" id="linko" to="/loan"><span>Back  </span></Link>

                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div class="main-box">
                <div class="fillthediv">

                    <div class="fixinputae">
                        <div class="logos">
                            <h2>Pay</h2>
                            <h2>{String(parseFloat(parseInt(loans["amount"]) / 10 ** 18).toFixed(2))} XDUSD</h2>

                        </div>
                        <div class="image-container">
                            <img src="../swap.png"></img>
                        </div>
                        <div class="logos">
                            <h2>Receive</h2>
                            <h2>{String((parseInt(loans["amountrawxdc"]) / 1e18).toFixed(2))} XDC</h2>
                        </div>
                    </div>

                    <div class="inputusd">
                        <div class="logo">
                            <h2>Collateral Ratio:</h2>


                        </div>
                        <div class="logo">
                            <h2>130%</h2>

                        </div>

                    </div>
                    <div class="button-container" onClick={payloann}>
                        <a href="#" class="btn" id="butto"><span>Pay Loan</span></a>

                    </div>

                </div>
            </div>
            <ToastContainer position="bottom-left" />
        </div>

    )
}

export default App