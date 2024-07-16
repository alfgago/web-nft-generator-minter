import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { getToken } from "next-auth/jwt"

// Helper function to initialize the Thirdweb SDK
const initializeThirdwebSDK = (apiURL: string, token: string) => {
  return new ThirdwebSDK(apiURL, {
    secretKey: token,
  })
}

// Function to update the NFT token
const updateNftToken = async (sdk: ThirdwebSDK, values: any) => {
  const contract = await sdk.getContract("nfts")
  const nft = await contract.erc721.update(values.id, {
    metadata: {
      ipfs: values.ipfs_token,
    },
  })
  return nft
}

// API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // Get the API URL and token from environment variables
    const apiURL =
      process.env.NEXT_PUBLIC_THIRDWEB_URL ?? "http://localhost:1337/"
    const token = process.env.THIRDWEB_API_TOKEN

    if (!token) {
      throw new Error("API token is missing")
    }

    // Initialize the Thirdweb SDK
    const sdk = initializeThirdwebSDK(apiURL, token)

    // Update the NFT token using the provided values
    const data = await updateNftToken(sdk, req.body)

    // Send a successful response with the updated data
    res.status(200).json(data)
  } catch (error: any) {
    // Send an error response
    res.status(400).json({ error: error.message })
  }
}
