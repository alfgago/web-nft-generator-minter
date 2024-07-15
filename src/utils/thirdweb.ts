import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"

const sdk = new ThirdwebSDK("polygon")

// Wallet connection
export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed")
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()
  sdk.setProviderOrSigner(signer)
  return signer
}

// Fetch NFTs owned by a wallet
export const getNFTs = async (walletAddress, contractAddress) => {
  const contract = sdk.getNFTModule(contractAddress)
  const nfts = await contract.getOwned(walletAddress)
  return nfts
}

// Mint a new NFT
export const mintNFT = async (contractAddress, metadata) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tx = await contract.mint(metadata)
  return tx
}

// Transfer an NFT
export const transferNFT = async (contractAddress, toAddress, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tx = await contract.transfer(toAddress, tokenId)
  return tx
}

// Get metadata of an NFT
export const getNFTMetadata = async (contractAddress, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const metadata = await contract.get(tokenId)
  return metadata
}

// Get contract metadata
export const getContractMetadata = async (contractAddress) => {
  const contract = sdk.getNFTModule(contractAddress)
  const metadata = await contract.getMetadata()
  return metadata
}

// Get total supply of NFTs in a contract
export const getTotalSupply = async (contractAddress) => {
  const contract = sdk.getNFTModule(contractAddress)
  const totalSupply = await contract.totalSupply()
  return totalSupply
}

// Get balance of NFTs for an address
export const getBalance = async (contractAddress, address) => {
  const contract = sdk.getNFTModule(contractAddress)
  const balance = await contract.balanceOf(address)
  return balance
}

// List an NFT for sale
export const listNFTForSale = async (contractAddress, tokenId, price) => {
  const contract = sdk.getMarketplaceModule(contractAddress)
  const listing = await contract.createListing({
    assetContractAddress: contractAddress,
    tokenId,
    price,
  })
  return listing
}

// Buy an NFT
export const buyNFT = async (marketplaceAddress, listingId) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const tx = await contract.buy(listingId)
  return tx
}

// Cancel a listing
export const cancelListing = async (marketplaceAddress, listingId) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const tx = await contract.cancelListing(listingId)
  return tx
}

// Batch mint NFTs
export const batchMintNFTs = async (contractAddress, metadataList) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tx = await contract.mintBatch(metadataList)
  return tx
}

// Check if a wallet is connected
export const isWalletConnected = () => {
  return window.ethereum && window.ethereum.selectedAddress
}

// Get the current wallet address
export const getCurrentWalletAddress = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed")
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  return await signer.getAddress()
}

// Fetch all listings from a marketplace
export const getAllListings = async (marketplaceAddress) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const listings = await contract.getAllListings()
  return listings
}

// Fetch a specific listing
export const getListing = async (marketplaceAddress, listingId) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const listing = await contract.getListing(listingId)
  return listing
}

// Get NFT owner
export const getNFTOwner = async (contractAddress, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const owner = await contract.ownerOf(tokenId)
  return owner
}

// Get transaction history of an NFT
export const getNFTTransactionHistory = async (contractAddress, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const history = await contract.getTransferEvents(tokenId)
  return history
}

// Approve a transaction
export const approveTransaction = async (contractAddress, spender, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tx = await contract.approve(spender, tokenId)
  return tx
}

// Revoke approval
export const revokeApproval = async (contractAddress, spender, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tx = await contract.revokeApproval(spender, tokenId)
  return tx
}

// Set approval for all
export const setApprovalForAll = async (
  contractAddress,
  operator,
  approved
) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tx = await contract.setApprovalForAll(operator, approved)
  return tx
}

// Check approval status
export const isApprovedForAll = async (contractAddress, owner, operator) => {
  const contract = sdk.getNFTModule(contractAddress)
  const approved = await contract.isApprovedForAll(owner, operator)
  return approved
}

// Get auction details
export const getAuction = async (marketplaceAddress, auctionId) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const auction = await contract.getAuction(auctionId)
  return auction
}

// Create an auction
export const createAuction = async (
  marketplaceAddress,
  assetContractAddress,
  tokenId,
  startingBid,
  duration
) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const auction = await contract.createAuction({
    assetContractAddress,
    tokenId,
    startingBid,
    duration,
  })
  return auction
}

// Place a bid on an auction
export const placeBid = async (marketplaceAddress, auctionId, bidAmount) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const tx = await contract.placeBid(auctionId, bidAmount)
  return tx
}

// Finalize an auction
export const finalizeAuction = async (marketplaceAddress, auctionId) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const tx = await contract.finalizeAuction(auctionId)
  return tx
}

// Cancel an auction
export const cancelAuction = async (marketplaceAddress, auctionId) => {
  const contract = sdk.getMarketplaceModule(marketplaceAddress)
  const tx = await contract.cancelAuction(auctionId)
  return tx
}

// Fetch current gas price
export const getCurrentGasPrice = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const gasPrice = await provider.getGasPrice()
  return gasPrice
}

// Estimate gas for a transaction
export const estimateGas = async (txObject) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const gasEstimate = await provider.estimateGas(txObject)
  return gasEstimate
}

// Fetch current network
export const getCurrentNetwork = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()
  return network
}

// Change network to Polygon
export const switchToPolygon = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed")
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }], // Polygon Mainnet chain ID
    })
  } catch (error) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ],
      })
    } else {
      throw error
    }
  }
}

// Subscribe to new block headers
export const subscribeToNewBlocks = (callback) => {
  const provider = new ethers.providers.WebSocketProvider(
    "wss://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_WS_KEY"
  )
  provider.on("block", (blockNumber) => {
    callback(blockNumber)
  })
  return provider
}

// Unsubscribe from new block headers
export const unsubscribeFromNewBlocks = (provider) => {
  provider.removeAllListeners("block")
}

// Get transaction receipt
export const getTransactionReceipt = async (txHash) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const receipt = await provider.getTransactionReceipt(txHash)
  return receipt
}

// Fetch token URI
export const getTokenURI = async (contractAddress, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tokenURI = await contract.tokenURI(tokenId)
  return tokenURI
}

// Fetch token metadata
export const getTokenMetadata = async (tokenURI) => {
  const response = await fetch(tokenURI)
  const metadata = await response.json()
  return metadata
}

// Listen to Transfer events
export const listenToTransferEvents = (contractAddress, callback) => {
  const contract = sdk.getNFTModule(contractAddress)
  contract.on("Transfer", (from, to, tokenId, event) => {
    callback({ from, to, tokenId, event })
  })
  return contract
}

// Stop listening to Transfer events
export const stopListeningToTransferEvents = (contract) => {
  contract.removeAllListeners("Transfer")
}

// Fetch contract owner
export const getContractOwner = async (contractAddress) => {
  const contract = sdk.getNFTModule(contractAddress)
  const owner = await contract.owner()
  return owner
}

// Check if an address is a contract
export const isContract = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const code = await provider.getCode(address)
  return code !== "0x"
}

// Fetch past events
export const getPastEvents = async (
  contractAddress,
  eventName,
  fromBlock,
  toBlock
) => {
  const contract = sdk.getNFTModule(contractAddress)
  const events = await contract.getPastEvents(eventName, { fromBlock, toBlock })
  return events
}

// Fetch current block number
export const getCurrentBlockNumber = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const blockNumber = await provider.getBlockNumber()
  return blockNumber
}

// Fetch block details
export const getBlockDetails = async (blockNumber) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const block = await provider.getBlock(blockNumber)
  return block
}

// Fetch transaction details
export const getTransactionDetails = async (txHash) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const tx = await provider.getTransaction(txHash)
  return tx
}

// Fetch account balance
export const getAccountBalance = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const balance = await provider.getBalance(address)
  return ethers.utils.formatEther(balance)
}

// Fetch gas estimate for a contract interaction
export const estimateGasForContractInteraction = async (
  contractAddress,
  methodName,
  ...args
) => {
  const contract = sdk.getContract(contractAddress)
  const gasEstimate = await contract.estimateGas[methodName](...args)
  return gasEstimate
}

// Encode function call
export const encodeFunctionCall = (contractAddress, methodName, ...args) => {
  const contract = sdk.getContract(contractAddress)
  return contract.interface.encodeFunctionData(methodName, args)
}

// Decode function result
export const decodeFunctionResult = (contractAddress, methodName, data) => {
  const contract = sdk.getContract(contractAddress)
  return contract.interface.decodeFunctionResult(methodName, data)
}

// Fetch token balance for an ERC20 token
export const getTokenBalance = async (tokenAddress, walletAddress) => {
  const contract = sdk.getTokenModule(tokenAddress)
  const balance = await contract.balanceOf(walletAddress)
  return balance
}

// Transfer ERC20 tokens
export const transferTokens = async (tokenAddress, toAddress, amount) => {
  const contract = sdk.getTokenModule(tokenAddress)
  const tx = await contract.transfer(toAddress, amount)
  return tx
}

// Approve ERC20 tokens
export const approveTokens = async (tokenAddress, spender, amount) => {
  const contract = sdk.getTokenModule(tokenAddress)
  const tx = await contract.approve(spender, amount)
  return tx
}

// Fetch allowance for ERC20 tokens
export const getTokenAllowance = async (tokenAddress, owner, spender) => {
  const contract = sdk.getTokenModule(tokenAddress)
  const allowance = await contract.allowance(owner, spender)
  return allowance
}

// Fetch ERC20 token metadata
export const getTokenMetadata = async (tokenAddress) => {
  const contract = sdk.getTokenModule(tokenAddress)
  const metadata = await contract.getMetadata()
  return metadata
}

// Fetch all ERC20 token transfers
export const getAllTokenTransfers = async (tokenAddress) => {
  const contract = sdk.getTokenModule(tokenAddress)
  const transfers = await contract.getAllTransfers()
  return transfers
}

// Fetch NFT royalties
export const getNFTRoyalties = async (contractAddress, tokenId) => {
  const contract = sdk.getNFTModule(contractAddress)
  const royalties = await contract.getRoyaltyInfo(tokenId)
  return royalties
}

// Set NFT royalties
export const setNFTRoyalties = async (
  contractAddress,
  tokenId,
  recipient,
  amount
) => {
  const contract = sdk.getNFTModule(contractAddress)
  const tx = await contract.setRoyaltyInfo(tokenId, recipient, amount)
  return tx
}

// Fetch all collections
export const getAllCollections = async () => {
  const collections = await sdk.getAllCollections()
  return collections
}

// Fetch collection details
export const getCollectionDetails = async (collectionId) => {
  const collection = await sdk.getCollection(collectionId)
  return collection
}

// Create a new collection
export const createCollection = async (metadata) => {
  const collection = await sdk.createCollection(metadata)
  return collection
}

// Add NFT to collection
export const addNFTToCollection = async (
  collectionId,
  contractAddress,
  tokenId
) => {
  const tx = await sdk.addNFTToCollection(
    collectionId,
    contractAddress,
    tokenId
  )
  return tx
}

// Remove NFT from collection
export const removeNFTFromCollection = async (
  collectionId,
  contractAddress,
  tokenId
) => {
  const tx = await sdk.removeNFTFromCollection(
    collectionId,
    contractAddress,
    tokenId
  )
  return tx
}

// Fetch collection NFTs
export const getCollectionNFTs = async (collectionId) => {
  const nfts = await sdk.getCollectionNFTs(collectionId)
  return nfts
}

// Fetch collection owners
export const getCollectionOwners = async (collectionId) => {
  const owners = await sdk.getCollectionOwners(collectionId)
  return owners
}

// Subscribe to new NFT mint events
export const subscribeToMintEvents = (contractAddress, callback) => {
  const contract = sdk.getNFTModule(contractAddress)
  contract.on("Mint", (to, tokenId, event) => {
    callback({ to, tokenId, event })
  })
  return contract
}

// Stop listening to mint events
export const stopListeningToMintEvents = (contract) => {
  contract.removeAllListeners("Mint")
}

// Fetch past mint events
export const getPastMintEvents = async (
  contractAddress,
  fromBlock,
  toBlock
) => {
  const contract = sdk.getNFTModule(contractAddress)
  const events = await contract.getPastEvents("Mint", { fromBlock, toBlock })
  return events
}

// Subscribe to new transfer events
export const subscribeToTransferEvents = (contractAddress, callback) => {
  const contract = sdk.getNFTModule(contractAddress)
  contract.on("Transfer", (from, to, tokenId, event) => {
    callback({ from, to, tokenId, event })
  })
  return contract
}

// Stop listening to transfer events
export const stopListeningToTransferEvents = (contract) => {
  contract.removeAllListeners("Transfer")
}

// Fetch past transfer events
export const getPastTransferEvents = async (
  contractAddress,
  fromBlock,
  toBlock
) => {
  const contract = sdk.getNFTModule(contractAddress)
  const events = await contract.getPastEvents("Transfer", {
    fromBlock,
    toBlock,
  })
  return events
}

// Subscribe to approval events
export const subscribeToApprovalEvents = (contractAddress, callback) => {
  const contract = sdk.getNFTModule(contractAddress)
  contract.on("Approval", (owner, approved, tokenId, event) => {
    callback({ owner, approved, tokenId, event })
  })
  return contract
}

// Stop listening to approval events
export const stopListeningToApprovalEvents = (contract) => {
  contract.removeAllListeners("Approval")
}

// Fetch past approval events
export const getPastApprovalEvents = async (
  contractAddress,
  fromBlock,
  toBlock
) => {
  const contract = sdk.getNFTModule(contractAddress)
  const events = await contract.getPastEvents("Approval", {
    fromBlock,
    toBlock,
  })
  return events
}

// Fetch all addresses that have interacted with a contract
export const getAllInteractingAddresses = async (contractAddress) => {
  const contract = sdk.getNFTModule(contractAddress)
  const events = await contract.getPastEvents("allEvents", { fromBlock: 0 })
  const addresses = new Set()
  events.forEach((event) => {
    addresses.add(event.returnValues.from)
    addresses.add(event.returnValues.to)
  })
  return Array.from(addresses)
}

// Fetch all NFTs by owner
export const getAllNFTsByOwner = async (contractAddress, owner) => {
  const contract = sdk.getNFTModule(contractAddress)
  const nfts = await contract.getOwned(owner)
  return nfts
}

// Fetch all NFT metadata
export const getAllNFTMetadata = async (contractAddress) => {
  const contract = sdk.getNFTModule(contractAddress)
  const nfts = await contract.getAll()
  const metadataList = await Promise.all(
    nfts.map(async (nft) => {
      const metadata = await contract.get(nft.id)
      return metadata
    })
  )
  return metadataList
}

// Fetch all NFT
