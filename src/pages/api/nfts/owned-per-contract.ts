import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 15 }) // cache for 10 seconds

const fetchData = async ({ contractAddress }: any) => {
  const alchemyToken = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const alchemyDomain =
    process.env.NEXT_PUBLIC_NETWORK == "goerli"
      ? "https://eth-goerli.g.alchemy.com"
      : "https://polygon-mainnet.g.alchemy.com"

  const cacheKey = `owned_per_contract_${contractAddress}`
  let owned = cache.get(cacheKey)
  if (owned) {
    return owned
  }

  try {
    const response = await axios.get(
      `${alchemyDomain}/nft/v2/${alchemyToken}/getOwnersForContract?contractAddress=${contractAddress}&withTokenBalances=true`
    )
    owned = response?.data?.ownerAddresses
      ? response?.data?.ownerAddresses
      : false
  } catch (e) {
    owned = false
  }

  cache.set(cacheKey, owned)
  return owned
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
