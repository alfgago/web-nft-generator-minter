import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  page = 1,
  limit = 3,
  pass = 0,
  minted = "All",
  user = false,
}: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `guests_${page}_${limit}_${pass}_${minted}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    populate: "event,Guests.nft",
  }

  if (pass) {
    // @ts-ignore
    params["filters[pass_collection][id][$eq]"] = pass
  }

  if (minted && minted != "All") {
    const isMinted = minted == "Minted"
    // @ts-ignore
    params["filters[is_minted][$ne]"] = !isMinted
  }

  if (user) {
    // @ts-ignore
    params["filters[event][artist][user][id][$eq]"] = user
  }

  const nftsResponse = await axios.get(`${apiURL}/api/guest-lists`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  cache.set(cacheKey, nftsResponse.data)
  return nftsResponse.data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
