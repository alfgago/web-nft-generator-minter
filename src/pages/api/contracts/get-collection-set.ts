import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"

// Initialize a cache with a 24-hour TTL (time-to-live)
const cache = new NodeCache({ stdTTL: 12 * 60 * 60 })

const fetchData = async () => {
  // Check if the data is already in the cache
  const cachedData = cache.get("getCollectionSet")

  if (cachedData) {
    return cachedData
  }

  const passes = await fetchPasses()
  const sdk = new ThirdwebSDK("goerli")
  const collectionSet = await sdk.api.createCollectionSet({
    collections: passes,
  })

  // Cache the data with a 24-hour TTL
  cache.set("getCollectionSet", collectionSet)

  return collectionSet
}

async function fetchPasses() {
  const sdk = new ThirdwebSDK("goerli")
  const passes = await sdk.api.getPasses({ limit: 100 })
  const contractAddresses = passes.map((pass) => pass.contract_address)
  return contractAddresses
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData()
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error registering the data", e })
  }
}
