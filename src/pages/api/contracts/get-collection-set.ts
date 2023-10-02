import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
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
  const options = {
    method: "POST",
    headers: {
      accept: "*/*",
      "content-type": "application/json",
      "x-api-key": "cef489d6-2ea3-5764-a540-88e4f9d9fb56",
    },
    body: JSON.stringify({ collections: passes }),
  }

  const response = await fetch(
    "https://api-goerli.reservoir.tools/collections-sets/v1",
    options
  )

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const data = await response.json()

  // Cache the data with a 24-hour TTL
  cache.set("getCollectionSet", data)

  return data
}

async function fetchPasses() {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/passes?limit=100"
  )
  const contractAddresses = data.data.map(
    (pass) => pass.attributes.contract_address
  )
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
