import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({ id }: any) => {
  try {
    const apiURL =
      process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
    const token = process.env.API_TOKEN

    const cacheKey = `shows_single_${id}`
    const cached = cache.get(cacheKey)
    if (cached) {
      return cached
    }

    const params = {
      populate: "image",
    }

    const response = await axios.get(`${apiURL}/api/events/${id}`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    cache.set(cacheKey, response.data)
    return response.data
  } catch (e) {
    return false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
