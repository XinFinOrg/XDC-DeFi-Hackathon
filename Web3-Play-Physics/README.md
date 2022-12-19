# Web3-Play-Physics
Learn Kinematics in a fun and an engaging manner using WRLDS iot ball, connected android app and Web3 eco-system tools powered by Chainlink VRF, Moralis, BNB, Covalent, Multichain and Near Protocol.

Website: https://sites.google.com/view/play-physics-with-wrlds

We are developing Covalent API Endpoints, one for fetching the total counter, user details and time stamp and the other for the token_ids of user ratings.

About: Physical world game simulator, playground -- you can add geometrical shapes, or draw your own shapes, do educational experiments, learn using the WRLDS iot connected balls, mobile SDKs, BNB, Covalent endpoints and Multi-chain messaging protocol, and see them come to life with forces (think gravity, Newton!), friction (scrrrrape), and inertia (ahh, slow down!).

Tools and Tech

Moralis

Chainlink VRF

BNB Blockchain

NFT.storage

Covalent and IPFS

Multi-Chain messaging protocol

Rearc's Mediawiki API powered by AWS Data Exchange

Near Protocol

Machine Learning

Data Analytics

Encryption

Web3 Cloud Computing


Rearc's Mediawiki API powered by AWS API Gateway: Rearc Mediawiki API served via Amazon Web Services API gateway: The MediaWiki Action API is a web service that allows access to Wiki search for Kinematics (Physics) related content served in the android application. It can provide information about Physics related concepts like Newtons Law of Forces, gravitation, rotational dynamics, acceleration, free body diagrams etc.

For educators' creating content on Mediawiki, Rearc Mediawiki API enables us to fetch wiki features like authentication, page operations by Physics educator and meta information about the wiki and the logged-in students per classroom and Physics educator (editor role).


Moralis Deployment URL: https://1li2klwerizr.usemoralis.com:2053/server (to be deployed to moralis)

Moralis Transaction Dashboard: We are developing an aggregated dashboard for all transfers and transactions using Moralis boilerplate as a reference. 

Features

Multi Player Game: Interactive and easy way to learn physics. Real-time experience to teach kids various laws of motion, sound waves, or light. Physics is everywhere!

Learning Together: Games and the activities are designed to involve children in different team buildling activities. WRLDS iot ball makes learning and fun lot more easier.

Fun with Physics: Physics explains how things move and how different kinds of energy can affect these things. Once someone understands the rules of physics, it’s possible to understand how the whole universe works! 


Impact

Learning Anytime Anywhere:  Physics relate to everyday life. Interactive way of learning helps in better and seamless adoption of science among young kids. 

Mass Reach: Web3 Play Physics is simple app which with the help of connected WRLDS ball, mobile phone and Web3 solutions powered by BNB, Cobvalent and Multi-chain can give real-time experience to various laws in physics like law of motion, energy, force and other key topics of Kinematics.

Details:

1. Covalent API endpoint: There 5 endpoint API that currently used on the Web3 Play Physics dashboard.

Get Block Height - to convert timestamp to block id

Get Log Events By Contract Address - to get log events like sold/listed nft/items on marketplace

Get Log Events By Topics - to get log data for specific event like sold/listed events on marketplace

Get Historical Token Prices - to get price of token in usd for currency that accept to buy nft/item on marketplace like $TUS, $BNB and $BCOIN

Get Nft External Metadata - to get metadata for nft like the attributes and image

Github link: please visit https://github.com/seetadev/Web3-Play-Physics/tree/main/Game-Dashboard-Covalent-BSC/gamefi-dashboard 

Covalent-NFT-Dashboard enables us to analyze, observe all NFTs from wallet address in different networks. 

We are extending and adapting the gamefi dashboard for Web3 Play Physics keeping Binance marketplace into focus.

2. Binance: Binance smart contracts for light client are implemented. Please visit https://github.com/seetadev/Web3-Play-Physics/tree/main/BSC-Smart-Contract-Light-Implement. The 2 marketplaces that we wish to focus to analyze the total volumes of the game played are Bombcrypto Marketplace (BSC) and Elfin Marketplace (BSC).

3. MultiChain: MultiChain Webapp integration with SocialCalc for analysis, tabulation, graphing, charting and visualization. Please visit https://github.com/seetadev/Web3-Play-Physics/tree/main/Game-Dashboard-Covalent-BSC/multichain-web-app

4. Near: We are extending and improving the guest book application to receive students feedback, stores feature requests from both students and Physics educators on the Physics use cases to cover so that they could use the app more productively at the classroom. Further, the app will enable the educators and students a method to pay or donate using Near supported wallet for a customized version of the Play Physics app to open source volunteers and contributors in order to sustain the game development project. Please visit https://github.com/seetadev/Web3-Play-Physics/tree/main/Near-User-Feedback-Book

5. Chainlink VRF:  We utilized Chainlink VRF (Verifiable Random Function) to enable provably fair and verifiable random number generator (RNG) that further enables smart contracts to access random values without compromising security or usability. For each request, Chainlink VRF generates one or more random values and cryptographic proof of how those values were determined. The proof is published and verified on-chain before any consuming applications can use it. This process ensures that results cannot be tampered with or manipulated by any single entity including oracle operators, users, or smart contract developers. At this juncture, we are planning to use only subscription supported network for Chainlink VRF.


# Steps to Run the game

1. Clone the repository: https://github.com/seetadev/Web3-Play-Physics and cd to the directory; cd to WRLDS ball (https://github.com/seetadev/Web3-Play-Physics/tree/main/Wrlds-Ball)

2. Install Android Studio and use subscribe to Rearc API using an AWS account. The AWS account used by us is aspiring.investments@gmail.com.
3. Use the reference aws get mediawiki requests for creating your custom json request if needed and compile the application using Android studio: 

aws dataexchange send-api-asset \
  --data-set-id [REPLACE_ME] \
  --revision-id  [REPLACE_ME] \
  --asset-id  [REPLACE_ME] \
  --method GET \
  --path "/api.php?action=parse&page=Project:Sandbox&format=json" \

4. Compile and build the application using ant commands "http://tools.android.com/tech-docs/ant-build-script"

5. Run the apk in your android device.









