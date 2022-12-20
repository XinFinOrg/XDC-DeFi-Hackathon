import { Outlet, Link } from "react-router-dom";
import '../App.css';
import { useEffect, useState, useContext, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Web3ModalContext } from "../context/web3model";
import { abi,contractaddr } from "./abi"

function App() {

    const [XDC, setXDC] = useState(0);
    const [XDCUSD, setXDCUSD] = useState(0);
    const [Price, setPrice] = useState(0);

    const [blinkme, setblinkme] = useState();
    const [balance, setbalance] = useState(0);
    const [connected, setConnected] = useState(false);
    const [useradd, setuseradd] = useState("connect");
    const [Period, setPeriod] = useState(2);
    const [contract, setContract] = useState();
    const { account, connect, disconnect, web3 } = useContext(Web3ModalContext);


    const handleConnectWallet = useCallback(() => {
        console.log("hieljslfjsflk");
        connect();

    }, [connect]);

    const handleDisconnectWallet = useCallback(() => {
        disconnect();
    }, [disconnect]);
    //const accounts =await window.ethereum.request({ method: 'eth_requestAccounts' });

    let onChangeAE = async (event) => {
        document.getElementById("butto").innerHTML = `<span class="loading"></span>`
        setXDCUSD(parseInt(event.target.value))
    }

    let onChangePeriod = async (event) => {
        document.getElementById("butto").innerHTML = `<span class="loading"></span>`
        setPeriod(parseInt(event.target.value))
    }

    let setUSD = (val) => {

        setXDCUSD(val * 0.7 * Price * 1000)

    }



    let takeloan = async () => {

        let contract = await new web3.eth.Contract(abi, contractaddr);


        setblinkme("Initiating Oracle Pricing")
        document.getElementById("maind").style.display = "none"
        document.getElementById("popup").style.display = "flex"
        let loanid;
        let loan;



        try {
            console.log(window.contract)
            loanid = await contract.methods.loanid().call();
            console.log(loanid)
            let amount = new web3.utils.BN((XDCUSD * 10 ** 18).toString())
            let trial = await contract.methods.getloan(amount, Period).send({ from: account });
            console.log("first step done")

        }
        catch (err) {
            if (err.toString() == `Error: Failed to check for transaction receipt:\n{}`) {
               
            }
            else{
            console.log(err);
            toast("Error Occured");
            document.getElementById("maind").style.display = "flex"
            document.getElementById("popup").style.display = "none"
            }
        }

        setblinkme("Finalizing the Loan")
        try {
            let amount = (XDC+0.2*XDC) * 10 ** 18
            await contract.methods.disburseloan(loanid).send({ value: amount.toString(), from: account });
            setblinkme("Loan Successfull")

            toast("Loan Successfully Taken");
            document.getElementById("maind").style.display = "flex"
            document.getElementById("popup").style.display = "none"
            document.getElementById("tsr").style.display = "block"

        }
        catch (err) {
            if (err.toString() == `Error: Failed to check for transaction receipt:\n{}`) {
                toast("Loan Taken Successfully");
                document.getElementById("maind").style.display = "flex"
                document.getElementById("popup").style.display = "none"
            }else{
            console.log(err)
            toast("Error occured");
            document.getElementById("maind").style.display = "flex"
            document.getElementById("popup").style.display = "none"
            }


        }





    }



    useEffect(() => {


        if (window.address) {

            document.getElementById("tsr").style.display = "block"

            const getSata = async () => {
                setConnected(true)
                document.getElementById("wallet").innerHTML = `<h7 style="color:white">
            ${window.address.slice(0, 5)}` + "........" + `${window.address.slice(window.address.length - 5, window.address.length)}
            <h7><br>${window.balance} XDC</h7>`
                document.getElementById("lo-co").style.display = "none"
                document.getElementById("wallet").style.display = "flex"

            }
            getSata()
        }



        const getData = setTimeout(async () => {
            let contract = await new web3.eth.Contract(abi, contractaddr);
            const price = await contract.methods.show().call();
            console.log(contract)
            setXDC((XDCUSD + (XDCUSD * Period * 5 / 3000)) / (price / 10000))
            window.price = price;
            document.getElementById("butto").innerHTML = `<span>Take Loan  </span>`
        }, 2000)

        return () => clearTimeout(getData)
    }, [XDCUSD, Period, account])

    async function Connectwallet() {
        console.log(connect)
        await connect();
        console.log(account)

        //  const accounts = await window.web3.eth.getAccounts()
        //  console.log(accounts);

        // accounts[0] = accounts[0].replace("0x", "xdc");
        //const accountBalance = (await window.web3.eth.getBalance(accounts[0])) / 1e18;

        /*console.log(accountBalance)
        setbalance(accountBalance)
        console.log(accounts[0])
        setuseradd(accounts[0])
        let size = accounts[0].length
        window.address = accounts[0];
        window.balance = accountBalance;

        document.getElementById("tsr").style.display = "block"
        document.getElementById("wallet").innerHTML = `<h7 style="color:white">
         ${accounts[0].slice(0, 5)}` + "........" + `${accounts[0].slice(accounts[0].length - 5, accounts[0].length)}
           <h7><br>${accountBalance} XDC</h7>`
        document.getElementById("lo-co").style.display = "none"
        document.getElementById("wallet").style.display = "flex"
*/
        setConnected(true);

    }

    return (
        <div className="App">

            <div className="header">

                <h1>XDUSD</h1>

                <div class="linkhandler">




                    <div class="lo-co" id="lo-co">
                        <div class="loaderr" id="loaderr"></div>
                    </div>
                    {!account ? (
                        <div class="button-container" id="wallet" onClick={Connectwallet}>

                            <a href="#" class="btn"><span>{useradd}</span></a>
                        </div>
                    ) : (
                        <div class="button-container" id="wallet" onClick={Connectwallet} style={{marginLeft:"-200px"}}>

                            <h4 style={{ "color": "white" }}>{account.replace("0x", "xdc").slice(0, 5) + "..." + account.slice(account.length - 5, account.length)}</h4>
                            <div class="button-container" id="tsr" style={{ display: "block", marginLeft: "20px" }}>
                                <Link class="btn" id="linko" to="/loan"><span>Loans  </span></Link>

                            </div>
                            <div class="button-container" id="tsr" style={{ display: "block", marginLeft: "20px" }}>
                                <Link class="btn" id="linko" to="/liquidate"><span>Liquidate  </span></Link>

                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div class="popup" id="popup">
                <div class="popupdiv">
                    <div class="main-box1">
                        <div class="fillthediv1">

                            <div class="asset-contra1">
                                <div class="asset-id1">

                                    <h1>Loan</h1>
                                </div>
                            </div>

                            <h1>Taking Loan on {XDC} XDC</h1>



                            <img class="image" src="../swap.png" alt="" width="70px" height="70px"></img>
                            <div class="blink_me" id="blinkme">
                                <h1>{blinkme}</h1>
                            </div>
                            <div class="loader-container">
                                <div class="loader" id="loader1"></div>
                                <div class="loader" id="loader2"></div>
                                <div class="loader" id="loader3"></div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            <div class="main-box" id="maind">
                <div class="fillthediv">

                    <div class="inputae">
                        <div class="logo">
                            <h3 style={{ color: "white" }}>XUSD</h3>

                        </div>
                        <input type="number" id="ae" value={XDCUSD} onChange={onChangeAE}></input>
                    </div>
                    <img src="./swap.png"></img>
                    <div class="inputusd">
                        <div class="logo">
                            <h3 style={{ color: "white" }}>XDC</h3>

                        </div>
                        <input disabled type="number" value={XDC}></input>
                    </div>
                    <div class="inputusd">
                        <div class="logo">
                            <h3 style={{ color: "white" }}>Time</h3>

                        </div>
                        <input type="number" id="period" value={Period} onChange={onChangePeriod}></input>
                    </div>
                    <div class="button-container" onClick={takeloan}>
                        <a href="#" class="btn" id="butto"><span>Take Loan  </span></a>

                    </div>

                </div>
            </div>
            <ToastContainer position="bottom-left" />

        </div>
    );
}

export default App;
