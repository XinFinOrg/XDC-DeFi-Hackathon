import { Outlet, Link } from "react-router-dom";
import '../App.css';
import './Loan.css';
import { useEffect, useState,useContext } from 'react';
import { Web3ModalContext } from "../context/web3model";
import { abi,contractaddr } from "./abi"

function App() {
    const [aeSdk, setAeSdk] = useState(null);
   
    const [loans,setloan] = useState([])
    const { account, connect, disconnect, web3 } = useContext(Web3ModalContext);

    async function Connectwallet() {
        console.log(connect)
        await connect();
        console.log(account)



    }
    useEffect( () => {
        // Update the document title using the browser API
        (async () => {
        console.log()
        let contract = await new web3.eth.Contract(abi, contractaddr);
        let loans = await contract.methods.getAllLoan().call()
        let myloans = loans.filter((check) => {
            return (account == check[6] && (true == check['status'] || check['completed'] == 'true')) 
        })
     
     
           setloan(myloans);
   
          })();
      },[]);






   
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
                                        <h2>{String(parseFloat(parseInt(loan["amountrawxdc"])/10**18).toFixed(2))}</h2>
                                    </div>
                                    <div class="asset">
                                        <h1>AUSD</h1>
                                        <h2>{String(parseFloat(parseInt(loan["amount"])/10**18).toFixed(2))} AUSD</h2>
                                    </div>
                                </div>
                                <div class="but">
                                    <div class="button-container">
                                        <a href="#" class="btn">  <Link  id="link" to={`/loan/${String(loan.loanid)}`}><span>
                                        {loan.completed ? 'Paid' : 'Details'}
                                            
                                        </span></Link></a>
                                    </div>
                                </div>

                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default App