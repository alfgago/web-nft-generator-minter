import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

// Function to update the mint status of an NFT
const updateMintStatus = async (values: any) => {
  const rpcUrl =
    process.env.NEXT_PUBLIC_RPC_URL ?? "https://rpc-mumbai.maticvigil.com"
  const privateKey = process.env.PRIVATE_KEY

  if (!privateKey) {
    throw new Error("Private key is not defined in environment variables")
  }

  // Initialize the Thirdweb SDK with the RPC URL and private key
  const sdk = ThirdwebSDK.fromPrivateKey(privateKey, rpcUrl)

  const contractAddress =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "0xYourContractAddress"
  const contract = await sdk.getContract(contractAddress, "nft-collection")

  // Parameters to update the NFT metadata
  const metadata = {
    is_minted: true,
    mint_order: parseInt(values.mint_order ?? 0),
    paper_transaction_id: values.paper_transaction_id ?? "",
  }

  // Update the NFT metadata
  const updatedNft = await contract.erc721.update(values.id, metadata)
  console.log("Updated NFT:", updatedNft)

  return updatedNft
}

// API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await updateMintStatus(req.body)
    res.status(200).json(data)
  } catch (error: any) {
    console.error("Error updating mint status:", error)
    res.status(400).json({ error: error.message })
  }
}
