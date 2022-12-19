import { text } from "stream/consumers";

const BRIDGE_WALLET = process.env.BRIDGE_WALLET;
const ORIGIN_TOKEN_CONTRACT_ADDRESS = process.env.ORIGIN_TOKEN_CONTRACT_ADDRESS;
const DESTINATION_TOKEN_CONTRACT_ADDRESS =
  process.env.DESTINATION_TOKEN_CONTRACT_ADDRESS;

const transferToken = async ({ contract, value, from }) => {
  try {
    console.log("Transfering tokens to ETH wallet 💸💸💸💸💸");
    const transfer = await contract.tranfer(BRIDGE_WALLET, from, value);
    await transfer.wait();
    console.log(
      `transferToEthWallet > You can see this transaction in ${process.env.ORIGIN_EXPLORER}${transfer.transactionHash}`
    );
  } catch (error) {
    console.error("Error in transferToEthWallet >", error);
  }
};

const mintToken = async ({ contract, amount, from }) => {
  try {
    console.log("Minting tokens on Polygon(Mumbai)");
    const mintTx = await contract.mint(from, amount);
    await mintTx.wait();
    console.log(`Transaction sent, hash is ${mintTx.hash}`);
    console.log(
      `mintTokens > You can see this transaction in ${process.env.DESTINATION_EXPLORER}${mintTx.transactionHash}`
    );
  } catch (err) {
    console.log(error);
    console.error("Error in mintTokens >", error);
  }
};

const approveBurn = async ({ contractDest, value }) => {
  try {
    console.log("Approving token burn 🔥🔥🔥🔥🔥");
    const approve = await contractDest.approve(BRIDGE_WALLET, value);
    await approve.wait();
    console.log(`Transaction sent, hash is ${approve.transactionHash}`);
    console.log(
      `approveForBurn > You can see this transaction in ${process.env.DESTINATION_EXPLORER}${approve.transactionHash}`
    );
  } catch (err) {
    console.log(err);
  }
};

const burnToken = async ({ contractDest, value }) => {
  try {
    console.log("Burning tokens from wallet 🔥🔥🔥🔥🔥");
    const burn = await contractDest.burnFrom(BRIDGE_WALLET, value);
    await burn.wait();
    console.log(`Transaction sent, hash is ${burn.transactionHash}`);
    console.log(
      `burnTokens > You can see this transaction in ${process.env.DESTINATION_EXPLORER}${burn.transactionHash}`
    );
  } catch (err) {
    console.log(err);
  }
};

export { approveBurn, transferToken, burnToken, mintToken };
