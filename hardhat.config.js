require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    local: {
      url: 'http://localhost:8545'
    },
    apothem: {
      url: 'https://erpc.apothem.network',
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: 'https://erpc.xinfin.network',
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  paths: {
    artifacts: "./app/src/artifacts"
  }
};
