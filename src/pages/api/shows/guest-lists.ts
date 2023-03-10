import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  page = 1,
  limit = 10,
  artist = 0,
  user = 0,
  eventList = false,
  eventType = false,
}: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `managed_shows_${page}_${limit}_${artist}_${user}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    populate: "artist.profile_picture,artist.user.",
  }
  if (user) {
    // @ts-ignore
    params["filters[artist][user][id][$eq]"] = user
  }

  if (eventType) {
    // @ts-ignore
    params["filters[passes][pass_type][$eq]"] = eventType
  }
  if (eventList) {
    const jsomArray = JSON.parse(eventList)
    jsomArray.map((event: any, index: number) => {
      // @ts-ignore
      params["filters[id][$in][" + index + "]"] = event
    })
  }

  const response = await axios.get(`${apiURL}/api/events`, {
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
