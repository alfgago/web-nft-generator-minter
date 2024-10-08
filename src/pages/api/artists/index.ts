import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  page = 1,
  limit = 2,
  random = false,
  user = 0,
  genre = 0,
  sort = false,
}: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `artists_${page}_${limit}_${random}_${user}_${genre}_${sort}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const params: any = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    populate: "banner,profile_picture,passes,events,members.nft_default_image",
    randomSort: random,
  }
  if (user) {
    params["filters[user][id][$eq]"] = user
  }
  if (genre && genre != "All") {
    params["filters[genre][$eq]"] = genre
  }
  if (sort) {
    params["sort[0]"] = sort
  }

  const response = await sdk.api.get("/api/artists", {
    params: params,
  })

  cache.set(cacheKey, response.data)
  return response.data
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
