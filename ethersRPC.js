import '@ethersproject/shims';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import { DAPP_CONTRACT } from "@env"

// To do for contract deploy
// 1. `yarn compile-contracts`
// 2. Change import to the new artifacts/abi.json
import * as TaskContractABI from './contracts/artifacts/TaskContract'

// 3. Deploy the contract
// 4. Use ABI + Contract Deploy address to Interface


// Note: ankr rpc was hacked so def want to change this
global.Buffer = global.Buffer || Buffer;
const providerUrl = 'https://rpc.ankr.com/eth_goerli'; // Or your desired provider url


// These are your front end functions for interfacing the contract
// I will be connecting these to the store:  if user has wallet, 
// update store values w chain functions on internal/events


const addTask = async (TaskText, key) => {
  try {
    const isComplete = false;
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const TaskContract = new ethers.Contract(DAPP_CONTRACT, TaskContractABI, signer);
    await TaskContract.estimateGas.addTask(TaskText, isComplete)
      .then(async (hex) => {
        let gasLimit = parseInt(hex.toHexString(), 16)
        console.log('gas estimate to post a favor is', gasLimit);
        if (gasLimit > 0) {
          let task = TaskContract.addTask(TaskText, isComplete, { gasLimit });
          return task;
        } else {
          let task = TaskContract.addFavor(TaskText, isComplete, { gasLimit: 30000 });
          return task;
        }
      });
  } catch (error) {
    console.log(error)
  }
}

const getMyTasks = async (key) => {
  try {
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const TaskContract = new ethers.Contract(DAPP_CONTRACT, TaskContractABI, signer);
    let myTasks = await TaskContract.getMyTasks();
    return myTasks;
  } catch (error) {
    console.log(error)
  }
}

const deleteTask = async (taskID, key) => {
  try {
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const TaskContract = new ethers.Contract(DAPP_CONTRACT, TaskContractABI, signer);
    let deleted = await TaskContract.deleteTasks();
    console.log('Deleted', deleted)
    return allFavors;
  } catch (error) {
    console.log(error)
  }
}


// Other Useful RPC Functions 
const getChainId = async () => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails;
  } catch (error) {
    return error;
  }
};


const getAccounts = async key => {
  try {
    const wallet = new ethers.Wallet(key);
    const address = wallet.address;
    return address;
  } catch (error) {
    return error;
  }
};

const getBalance = async key => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const balance = await wallet.getBalance();
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  } catch (error) {
    return error;
  }
};

const sendTransaction = async (key, destination, maxPriorityFeePerGas, maxFeePerGas) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    // Convert 1 ether to wei
    const amount = ethers.utils.parseEther('0.001');

    // Submit transaction to the blockchain
    const tx = await wallet.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: maxPriorityFeePerGas ? maxPriorityFeePerGas : '5000000000', // Max priority fee per gas
      maxFeePerGas: maxFeePerGas ? maxFeePerGas : '6000000000000', // Max fee per gas
    });
    return tx;
  } catch (error) {
    return error;
  }
};

const signMessage = async (key, message) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const originalMessage = message;
    // Sign the message
    const signedMessage = await wallet.signMessage(originalMessage);
    return signedMessage;
  } catch (error) {
    return error;
  }
};

export default {
  addTask,
  getMyTasks,
  deleteTask,
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
};