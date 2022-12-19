# XDCTind - Mint Matches on the XDC Network

[![CodeQL](https://github.com/jongan69/xdctind/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jongan69/xdctind/actions/workflows/codeql-analysis.yml)

- React Native
- Solidity Contract ABI usage
- `web` directory w/ Nextjs Swagger API Documentation
- Web3 Auth SDK
- Nhost SDK

Includes demo solidity contracts with a `compile-contracts` command in `package.json`

Built under The XDC 2022 Hackathon

------

## Demo

[LATEST APP X.XX (Expo)](https://expo.dev/@jongan69/xdctind)

[LATEST SWAGGER](https://xdc-de-fi-hackathon.vercel.app/)

[LATEST CONTRACT X.XX (XDC Network)](https://remix.xinfin.network/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js)

------

### Setup

1. Create Web3Auth.io Account at <https://dashboard.web3auth.io/>
2. Copy into credentials .env and constant.js

   Note: `WEB_API_ROUTES` would be the URL of the deployed nextjs app

   ie: vercel

3. yarn install inside the root and web directories

   Note: There is now an included `continue as guest` button

***For smart contract functionality***

1. Compile + Deploy your contract

   Note: `compile-contracts` does not deploy

2. Import `abi` into `etherRPC.js` and interface with corresponding contract functions
3. Import the functions where ever needed throughout app

------

### Usage

`yarn ios` - Run iOS App

`yarn android` - Run Android App

`yarn web` - Start Nextjs app

`yarn compile-contracts` - Compile the Contract in `./contracts/` for abi, may need to edit `package.json`

For NHOST Database/Auth:
in `.env` -> backendUrl: "YOUR_NHOST_BACKEND_URL"

To Run Nextjs App:
  `yarn web` in root directory

------

### To do

[Chaining Contract Calls](https://blog.chain.link/smart-contract-call-another-smart-contract/)

- [x] Expo React Native App
- [x] Web3Auth - React Native SDK
- [x] Add Redux Thunk
- [x] Switch Context with Redux Store
- [->] Create all redux slices w/ actions
- [->] Replace Reducer Functions with Secure Store Functions
- [->] Build corresponding contract
- [->] Deploy contract to XDC
- [->] Connect Mobile UI to Smart Contract Functions
