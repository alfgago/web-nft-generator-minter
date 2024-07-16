import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  page = 1,
  limit = 10,
  artist = 0,
  user = 0,
  passType = false,
  passId = 0,
  nft = 0,
  future = false,
}: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `shows_${page}_${limit}_${artist}_${user}_${passType}_${passId}_${nft}_${future}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const sdk = new ThirdwebSDK(apiURL, {
    secretKey: token,
  })

  const params: any = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    "sort[0]": "date:desc",
    populate: "artist.profile_picture,image",
  }
  if (artist) {
    params["filters[artist][id][$eq]"] = artist
  }
  if (user) {
    params["filters[artist][user][id][$eq]"] = user
  }
  if (future) {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0") // January is 0!
    const yyyy = today.getFullYear()
    const todayString = yyyy + "-" + mm + "-" + dd

    params["sort[0]"] = "date:asc"
    params["filters[date][$gte]"] = todayString
  }
  if (passType) {
    params["filters[passes][pass_type][$eq]"] = passType
  }

  if (passId) {
    params["filters[passes][id][$eq]"] = passId
  }

  if (nft) {
    params["filters[passes][nfts][id][$eq]"] = nft
  }

  const response = await sdk.api.get(`/api/events`, {
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
