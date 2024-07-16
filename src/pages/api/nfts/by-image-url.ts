import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"

const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({ image }: any) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

  const cacheKey = `nfts_byipfs_${image}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const sdk = new ThirdwebSDK("mainnet") // or other network
  const contract = await sdk.getContract(contractAddress, "nft-collection")

  const nfts = await contract.erc721.getAll({
    filters: {
      image: `ipfs://${image}`,
    },
    order: {
      name: "asc",
    },
    limit: 10,
    offset: 0,
  })

  if (nfts.length > 0) {
    cache.set(cacheKey, nfts[0])
    return nfts[0]
  }
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    if (!data) {
      res.status(404).send({ err: "NFT not found" })
      return
    }
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
