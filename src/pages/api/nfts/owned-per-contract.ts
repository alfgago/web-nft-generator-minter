import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"

const cache = new NodeCache({ stdTTL: 15 }) // Cache for 15 seconds

const fetchData = async ({ contractAddress }) => {
  const network = process.env.NEXT_PUBLIC_NETWORK || "polygon" // Default to polygon if not specified
  const sdk = new ThirdwebSDK(network)
  const cacheKey = `owned_per_contract_${contractAddress}`

  let owned = cache.get(cacheKey)
  if (owned) {
    return owned
  }

  try {
    const contract = sdk.getNFTCollection(contractAddress)
    const owners = await contract.getAllOwners()

    owned = owners.length ? owners : false
  } catch (e) {
    console.error("Error fetching data from Thirdweb:", e)
    owned = false
  }

  cache.set(cacheKey, owned)
  return owned
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const data = await fetchData(req.body)
    res.status(200).json(data)
  } catch (e) {
    console.error("Error in handler:", e)
    res
      .status(400)
      .json({ error: "There was an error fetching the data", details: e })
  }
}
