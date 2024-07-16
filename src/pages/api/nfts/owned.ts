import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"

// Initialize cache with a TTL of 30 seconds
const cache = new NodeCache({ stdTTL: 30 })

const fetchData = async ({ address }: any) => {
  const cacheKey = `owned_nfts_${address}`
  const ownedNfts = cache.get(cacheKey)
  if (ownedNfts) {
    return ownedNfts
  }

  // Initialize Thirdweb SDK
  const network =
    process.env.NEXT_PUBLIC_NETWORK === "goerli" ? "goerli" : "polygon"
  const sdk = new ThirdwebSDK(network, {
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  })

  // Fetch owned NFTs
  const nfts = await sdk.wallet.getNFTs(address)

  // Filter NFTs to only get the PlusOne ones
  const filteredNfts = filterNfts(nfts)
  cache.set(cacheKey, filteredNfts)
  return filteredNfts
}

// Filters the owned NFTs to only get the PlusOne ones
function filterNfts(array: any) {
  return array.filter(
    (obj: any) => obj.metadata.symbol === "P1" && obj.metadata.image
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    console.error(e)
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
