/// DEX Contract Deployed on XDC Apothem Testnet

/// We are using similar to what Uniswap uses in their architecture to create contracts

1. Core contracts

- ERC20 Token Contract - Token contract for the tokens we are gonna use and one token for the pool managment

- PAIR Contract - This Contract handles , the swapping , minting , and burning for the PAIR

- Factory contract - that manages and create the PAIR Contract

2. Frontends Contracts

- Router - Contract that can be use by frontend to just intiate Swapping and Liquidity

- Price Oracle - fetch the price of the tokens in respect to each other according to the one offered in the pool

3. Others Contract

- IXDC Token
- Mock token 1
- Mock token 2
- ETH Wrapper - if Bridge Created
- Stablecoin Backed by XDC

/// Aim

- Manage the Funds
- for Liquidity Providers
- Create Pool for a token PAIR
- Swapping for token PAIR
- Protocol Fee
- Price Oracle
- Stable Coin

/// Lending - Borrowing

1. Lending Pool - Contract handles the lending and borrowing of a particular asset
2. Pool Factory - Creates Pool for a new Contract and then allow users to
3. Pool Router - Functions to deposit, withdraw , borrow and repay for a particular asset

/// Staking

1. Staking Pool - Staked the defined token for the user
2. Staking reward Token - The reward token which is to be sent for the Staking users do
3. Staking Factory - Create and Manages the various Staking Pool

We have plans to allow users to pay protocol fees in the Reward Token we offer to them , in this way it can be utilised

## NOTE : Swapping contracts are ready for Mainnet Deployement . The contracts are properly audited , gas optimized and quailty approved .

## NOTE : LENDING and STAKING contracts Not fit for mainnet, No Audit has been done for these contracts. Issues maybe present.
