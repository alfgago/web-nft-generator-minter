import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({ user = 0 }: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `managedartists_${user}`
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
    populate:
      "artists.banner,artists.profile_picture,artists.passes,artists.events,artists.members.nft_default_image",
  }

  const response = await sdk.api.get(`/api/users/${user}`, { params })

  cache.set(cacheKey, response.data.artists)
  return response.data.artists
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
