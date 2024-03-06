# TON-Transactions

### TON Smart Contract Address (Mainnet)
  `EQC9bflrgA3tOn24f0FTwDicysBiRMiHCxcYFrVhSONVO3hv`
   Note: Required Message `"Refund 99.9%"`
   
### TON Smart Contract Transactions 
  https://tonscan.org/address/EQC9bflrgA3tOn24f0FTwDicysBiRMiHCxcYFrVhSONVO3hv

## Corner Case
  Because in the message mode I am using message mode flag as - `Pay transfer fees separately from the message value`
  So because of this if transfer fees is more than 0.1% of the refund value then It will deduct it from Contract's Wallet which is not the right thing because someone can DDOS the contract and drain the Contract's Wallet. So we can easily add check of this in Contract message to abort it if this becomes the case.

## Difference between TON & Ethereum Smart Contract I found
   One notable distinction is the fee model: TON requires smart contracts to cover their resource costs, contrasting with Ethereum's user-based transaction fees. Moreover, TON's asynchronous smart contract calls differ from Ethereum's synchronous model, posing challenges in reasoning about transaction outcomes. Additionally, TON's approach to smart contract mutability contrasts sharply with Ethereum's immutability principle. These differences reflect varying design philosophies, presenting developers with distinct challenges and opportunities when building on each platform.
   To be honest, this blog [https://blog.ton.org/six-unique-aspects-of-ton-blockchain-that-will-surprise-solidity-developers] helped alot in understanding the differences in detail.

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

Note: You need to run refundSplitBill only with the amount required nothing else because its already deployed on mainnet.
