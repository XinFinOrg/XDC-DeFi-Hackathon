import { Outlet, Link } from "react-router-dom";
import '../App.css';
import './Liquidate.css';
import { useEffect, useState, useContext } from 'react';
import { Web3ModalContext } from "../context/web3model";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { abi, contractaddr } from "./abi"

function App() {
    const [aeSdk, setAeSdk] = useState(null);

    const [loans, setloan] = useState([])
    const [currentblock, setCurrentblock] = useState(0)
    const { account, connect, disconnect, web3 } = useContext(Web3ModalContext);

    async function Connectwallet() {
        console.log(connect)
        await connect();
        console.log(account)



    }


    async function liquidate(id) {
        let contract = await new web3.eth.Contract(abi, contractaddr);
        try {
            console.log(id)
            document.getElementById(id.toString()).innerHTML = `<span class="loading"></span>`
            let ans = await contract.methods.liquidate(id).send({from:account});
            toast("Loan Payed Successfully");
        } catch (err) {
            console.log(err.toString())
            if (err.toString() == `Error: Failed to check for transaction receipt:\n{}`) {
                document.getElementById(id.toString()).innerHTML = `<span>Liquidated</span>`
                toast("Loan Payed Successfully");
            }
            else {
                console.log(err)
                toast("Error Occured");
                document.getElementById("butto").innerHTML = `<span>Liquidate</span>`
            }
        }

    }
    useEffect(() => {
        // Update the document title using the browser API
        (async () => {
            
            let contract = await new web3.eth.Contract(abi, contractaddr);
            let block = await web3.eth.getBlockNumber()
            setCurrentblock(block)
            let loans = await contract.methods.getAllLoan().call()
            let myloans = loans.filter((check) => {
                return (true == check['status'] && check['completed'] == false)
            })
     

            console.log(myloans)


            setloan(myloans);

        })();
    }, []);







    return (
        <div className="App">
            <div className="header">

                <h1>AEUSD</h1>

                <div class="linkhandler">



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
                                <Link class="btn" id="linko" to="/"><span>Take  </span></Link>

                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div class="contain-loan">
                <div class="loan-container">
                    {
                        /*  This maps each array item to a div adds
                        the style declared above and return it */
                        loans.map(loan =>

                            <div class="single-loan" key={loan}
                            >
                                <div class="asset-container">
                                    <div class="asset-contra">
                                        <div class="asset-id">

                                            <h1>{String(loan.loanid)}</h1>
                                        </div>
                                    </div>
                                    <div class="asset">
                                        <h1>XDC</h1>
                                        <h2>{String(parseFloat(parseInt(loan["amountrawxdc"]) / 10 ** 18).toFixed(2))}</h2>
                                    </div>
                                    <div class="asset">
                                        <h1>XDUSD</h1>
                                        <h2>{String(parseFloat(parseInt(loan["amount"]) / 10 ** 18).toFixed(2))} XDUSD</h2>
                                    </div>
                                    <div class="asset">
                                        <h1>Time</h1>
                                        <h2>{String(parseInt(loan["period"]) + parseInt(loan["reqtimestamp"]) - currentblock)} Block</h2>
                                    </div>
                                </div>
                                <div class="but">
                                    <div class="button-container" onClick={() => { liquidate(loan["loanid"]) }}>
                                        <a href="#" class="btn" id={loan['loanid'].toString()}><span>Liquidate  </span></a>

                                    </div>

                                </div>

                            </div>
                        )
                    }

                </div>
            </div>
            <ToastContainer position="bottom-left" />
        </div>
    )
}

export default App