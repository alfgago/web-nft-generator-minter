import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  page = 1,
  limit = 2,
  random = false,
  user = 0,
  type = "Lottery",
}: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `tours_${page}_${limit}_${random}_${user}_${type}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    populate: "banner,profile_picture,passes",
    randomSort: random,
  }
  if (type) {
    // @ts-ignore
    params["filters[pass_type][$eq]"] = type
  }
  if (user) {
    // @ts-ignore
    params["filters[user][$eq]"] = user
  }

  const response = await axios.get(`${apiURL}/api/artists`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
