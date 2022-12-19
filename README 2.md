## XSyn Protocol - Synthetic Assets Issuance/Trading Protocol

## Inspiration
Highly inspired by "Synthetix Derivatives Protocol"!, we have created this - the "XSyn Protocol"

XSyn Protocol is a crypto-backed synthetic asset platform built on XDC Network.

It is a multi-token system, powered by XDC and PLI. XDC/PLI holders can stake XDC or PLI to mint XDUSD(crypto-backed stablecoin). Minted XDUSD tokens can be swapped against an ever-growing list of Synthetix Assets/commodities via Smart Contract. Currently, the protocol is deployed in Apothem and can be taken soon to MAINNET.

Prices are committed on the chain by a trusted oracle provided by Plugin(@Goplugin).

## What it does
XSyn Protocol is a decentralized synthetic asset issuance protocol built on XDC Network. These synthetic assets are collateralized by the XDC or PLI token which when locked in the contract enables the issuance of synthetic USD (XDUSD) tokens. This pooled collateral model allows users to perform conversions between Synths directly with the smart contract, avoiding the need for counterparties. This mechanism solves the liquidity and slippage issues experienced by DEXs. Xsyn protocol currently supports synthetic fiat currencies, cryptocurrencies (long and short), and commodities. 

## How we built it
We have completely built this complex protocol from Scratch. It has a bunch of smart contracts responsible for trading & swapping functionalities. 

## Challenges we ran into
It is a very complex defi protocol to understand and convert the idea into a working prototype. We have faced issues while programming the debt pool and its tracking of various synthetic assets for each users.

## Accomplishments that we're proud of
We were able to complete phase 1 of the XSyn protocol without major issues. We are working on enhancing this protocol with rewards, burning mechanisms, etc. We have accomplished a major milestone which is a core part of this protocol, we are very proud of it.

## What we learned
- How Synthetix Assets works
- How a pooled investment has to track
- Swapping
- Contract to Contract Issuance
- Many more

## Features Ready
- XSyn Protocol Contract
- XDC / PLI Staking 
- XDUSD (Platform Token) Minting with C-Ratio
- XSyn Exchange Contract which allows the user to Swap the XDUSD with the synthetic assets/commodities
- Integrated PLUGIN(Decentralized Oracle) for each synthetic asset prices
- Debt Pool
- Deriving the System C-Ratio & User C-Ratio
- Minimum Staking Updates
- Contract to Contract Issuance
- Assets / Commodities that are ready to swap / trade as Synthetix value
- (BTC, ETH, PAX, SOL, MATIC, XAU, AAVE, CGO, PRNT, XSP, SRX ) 
- Each Token is prefixed with "XD"
- (XDBTC, XDETH, XDPAX, XDSOL, XDMATIC, XDXAU, XDAAVE, XDCGO, XDPRNT, XDXSP, XDSRX ) 

## What's next for xSyn Protocol 
# To enhance this version with the following features
- Rewards for Stakers
- Burn Mechanisms
- Liquidate the defaulters 
- Maintaining the Collateral Ratio
- Exchange fee for swapping of Synths 
- Governance mechanism
- Periodic Checks
- User guides and Docs


# License Information
Source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file.