import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
import { ethers } from "ethers"

// Initialize cache
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

// Initialize Thirdweb SDK
const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
)
const sdk = new ThirdwebSDK(provider)

const fetchNFTs = async ({
  page = 1,
  limit = 3,
  pass = 0,
  minted = "All",
}: any) => {
  const cacheKey = `nfts_${page}_${limit}_${pass}_${minted}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const nftModule = sdk.getNFTModule(process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS)

  let nfts = await nftModule.getAll()

  if (pass) {
    nfts = nfts.filter((nft) => nft.metadata.pass_collection_id === pass)
  }

  if (minted !== "All") {
    const isMinted = minted === "Minted"
    nfts = nfts.filter((nft) => nft.metadata.is_minted === isMinted)
  }

  const startIndex = (page - 1) * limit
  const paginatedNFTs = nfts.slice(startIndex, startIndex + limit)

  cache.set(cacheKey, paginatedNFTs)
  return paginatedNFTs
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchNFTs(req.query)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
