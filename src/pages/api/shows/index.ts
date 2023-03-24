import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
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
}: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `shows_${page}_${limit}_${artist}_${user}`
  const cached = cache.get(cacheKey)
  if (cached) {
    // return cached
  }

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    "sort[0]": "date:desc",
    populate: "artist.profile_picture,image",
  }
  if (artist) {
    // @ts-ignore
    params["filters[artist][id][$eq]"] = artist
  }
  if (user) {
    // @ts-ignore
    params["filters[artist][user][id][$eq]"] = user
  }

  if (passType) {
    // @ts-ignore
    params["filters[passes][pass_type][$eq]"] = passType
  }

  if (passId) {
    // @ts-ignore
    params["filters[passes][id][$eq]"] = passId
  }

  if (nft) {
    // @ts-ignore
    params["filters[passes][nfts][id][$eq]"] = nft
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
