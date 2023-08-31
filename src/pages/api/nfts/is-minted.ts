import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 10 }) // cache for 10 seconds

const fetchData = async ({ contractAddress, tokenId }: any) => {
  const alchemyToken = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const alchemyDomain =
    process.env.NEXT_PUBLIC_NETWORK == "goerli"
      ? "https://eth-goerli.g.alchemy.com"
      : "https://polygon-mainnet.g.alchemy.com"

  const cacheKey = `is_minted_nfts_${contractAddress}_${tokenId}`
  const isOwned = cache.get(cacheKey)
  if (isOwned) {
    return isOwned
  }

  let minted = false
  try {
    const response = await axios.get(
      `${alchemyDomain}/nft/v2/${alchemyToken}/getOwnersForToken?contractAddress=${contractAddress}&tokenId=${tokenId}`
    )
    minted = response?.data?.owners ? response?.data?.owners[0] : false
  } catch (e) {
    minted = false
  }

  cache.set(cacheKey, minted)
  return minted
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.body)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
