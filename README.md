# XDC-DeFi-Hackathon


## XDCSwap

### Project Description

##### Idea
- People put their money in banks thinking they have control over it, but in actuality, banks control the money.
- 'Your Money, Your Control,' is the core of Blockchain Technology which is how Decentralized Exchange work under the hood and this has long attracted me. As laws tighten, more people are turning to decentralised exchanges, discovering the actual value of blockchain and decentralised exchanges.
- Banks have unlimited control over money and can even refuse to enable customers to withdraw it in an emergency.
- There is no transparency in the operations of the Banks and everingthing is Centralized
- What's a better way to exchange your money while still having the ability to contribute to the XDC Ecosystem in the form of the fees which you anyhow have to pay to the big Institutions and banks.

##### Implementation
- We have forked UniswapV2 and deployed it on the XDC Network, as well as rendered our own UI, which is being hosted using Spheron Protocol, and link the smart contracts with the UI, allowing users to interact with the protocol.
- We have also made some modifications to the Uniswap's smart contracts to automatically transmit 0.01% of the total fees for the projects, for a total of 0.08% to the global causes, 0.02% to the protocol for continued development and improvement of the protocol, and 0.3% to the liquidity providers for their contribution.
- Tools Used: Solidity, Remix, XDC Blockchain, React and Metamask.

##### Intended Users
- People who wnat complete authority and transparency over their assets are the intended users as DEXs are decentralized and provides complete transparency and record which is publicaly avaliable to everyone on the Blockchain

### Summary
- XDCSwap enables anyone from anywhere in the globe to purchase and sell cryptocurrencies immediately using XDC Network.
- XDCSwap will contribute to the projects being build on the XDC Network by providing them with the funds as decided by the community.
- It does not discriminate anyone and will be open to everyone.
- XLP Token can be earned by providing liquidity and earning a steady passive income.

### URLs
https://xdc-defi-hackathon-xdcswap-f83ca7.spheron.app/

### Video Demo
https://youtu.be/Dg4Riuo2y00

### ☄️ What's next?
- More features will be introduced, such as farming, staking, and limit orders to make XDCSwap more accessible to everyone and a common destination for everyone's needs.
- Creating a fully community-driven protocol in which the community votes on all protocol-related decisions.

## ⚡ Hackathon

This project was made for [XDC DeFi Hackathon](https://xdc.devpost.com/?ref_feature=challenge&ref_medium=your-open-hackathons&ref_content=Submissions+open)

### Deployed Addresses
- Factory: [xdce7F7067C9ECAB27c5F7f13E02b13eD50931f6D0f](https://xdcscan.io/address/xdce7F7067C9ECAB27c5F7f13E02b13eD50931f6D0f#transactions)
- Router: [xdc90D4e9eB792602AA7A7506b477B878307C35e24A](https://xdcscan.io/address/xdc90D4e9eB792602AA7A7506b477B878307C35e24A#transactions)
- WXDC Address : [xdc0c0d088A6Fe7C65754D821eB94Bce29c2Cfb0D1d](https://xdcscan.io/address/xdc0c0d088A6Fe7C65754D821eB94Bce29c2Cfb0D1d#transactions)
- Multicall contract Address : [xdc3221CE4Ade9a9564b34992a6d9Dd35E38D3884C9](https://xdcscan.io/address/xdc3221CE4Ade9a9564b34992a6d9Dd35E38D3884C9#transactions)
- XDCSwap Token Address : [xdc9a4FFBec1FE81a68A089F51D8be30CE32640b0e9](https://xdcscan.io/address/xdc9a4FFBec1FE81a68A089F51D8be30CE32640b0e9#transactions)

### 🚫 License
This repository includes an [unlicensed](http://unlicense.org/) statement.

## Deploying the XDCSwap on local machine

Clone the repository

move into the UserInterface Directory

```sh
cd UserInterface
```

install dependencies using **yarn** or **npm**

**having some dependency version problems in yarn, so advised to use npm commands instead**

```sh
yarn

or

npm install
```
If using Windows then run these two commmands after npm install

```sh
rm -r ./node_modules/@uniswap/sdk
```
And Then this command

```sh
cp -r ./forks/@uniswap/sdk ./node_modules/@uniswap/sdk
```

start the development server
```sh
yarn start

or

npm start
```

build with production mode
```sh
yarn build

or

npm run build
```
