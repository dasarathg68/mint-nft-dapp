# NFT Club Membership

NFT Club Membership is a decentralized platform for managing NFT-based club memberships. It provides functionalities for minting NFTs, viewing NFTs, and managing membership roles. The project uses Next.js, Wagmi hooks, Solidity, Hardhat, RainbowKit, and WalletConnect.

## Features

- **NFT Token Contract**: Implemented with Solidity, featuring the NFT token named `TheBigSad` with unit `SAD`.
- **Admin Actions**: Allows admins to mint new NFTs.
- **Member Actions**: Enables members to view all NFTs and their own NFTs.
- **Wallet Integration**: Supports wallet connections via RainbowKit and WalletConnect.

## Getting Started

Follow these instructions to set up your development environment and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- A web3 wallet (e.g., MetaMask)



### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:dasarathg68/mint-nft-dapp.git```
2. Install dependencies
   ```bash
   cd app
   npm install```
   
### Enviromental variables
- 'NEXT_PUBLIC_CONTRACT_ADDRESS' is the deployed contract address.
- 'NEXT_PUBLIC_CHAIN' is the chain ID that the contract is deployed to.
```typescript 
NEXT_PUBLIC_CONTRACT_ADDRESS="Aeb08E985ddAbf9e5F632a9EA2E6fdDF266C2Ec6"
NEXT_PUBLIC_CHAIN="11155111" ```
