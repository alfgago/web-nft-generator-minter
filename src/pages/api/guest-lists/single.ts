import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 5 }) // cache for 30 seconds

const getGuestList = async (values: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `single_guestlist_${values.nft}_${values.event}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const params = {
    "pagination[page]": 1,
    "pagination[pageSize]": 10,
    "filters[event][id][$eq]": values.event,
    "filters[nft][id][$eq]": values.nft,
  }

  const response = await sdk.api.get("/api/guest-lists", { params })

  cache.set(cacheKey, response?.data)
  return response?.data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getGuestList(req.query)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
