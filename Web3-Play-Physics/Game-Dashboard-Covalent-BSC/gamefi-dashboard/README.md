Web3 Play Physics dashboard is a dashboard that show total volumes of game marketplace like how many items that sold on the marketplace and etc.
Currently there are 3 game marketplaces that includes on this dashboard:
1. Bombcrypto Marketplace (BSC)
2. Crabada Marketplace (Avalanche)
3. Elfin Marketplace (BSC)


## Tools & Resources

Tools:
- [Nextjs](https://nextjs.org/)
- [Carbon charts](https://www.carbondesignsystem.com/data-visualization/simple-charts/)

Resources:
- [Covalent API](https://www.covalenthq.com/)

#### Covalent API Details

There 5 endpoint API that currently used on this dashboard
1. `` Get Block Height `` -  to convert timestamp to block id
2. `` Get Log Events By Contract Address `` -  to get log events like sold/listed nft/items on marketplace
3. `` Get Log Events By Topics `` - to get log data for spesific event like sold/listed events on marketplace
4. `` Get Historical Token Prices `` - to get price of token in usd for currency that accept to buy nft/item on marketplace like $TUS, $BNB and $BCOIN
5. `` Get Nft External Metadata `` - to get metadata for nft like the attributes and image

## How To Run
1. `` git clone repo ``
2. `` yarn or npm install ``
3. add .env.local on the root folder of projects with key value ``NEXT_PUBLIC_API_KEY=YOUR_COVALENT_API_KEY``
4. `` npm run dev ``


