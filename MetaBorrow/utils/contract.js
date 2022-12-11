import { getWeb3 } from "./web3";
import { abi } from "./abi";
let contract;
const address="0x11FB2d9D8aA05134108526c96B213f0126e1Ca87";
const getInstance= async ()=>{
    try {
        let web3 = await getWeb3();
        contract= await new web3.eth.Contract(abi,address);
        return contract;
    } catch (error) {
        console.log(error)
    }
}

export default getInstance;