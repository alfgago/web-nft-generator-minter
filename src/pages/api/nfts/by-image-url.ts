import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({ image }: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `nfts_byipfs_${image}`
  const cached = cache.get(cacheKey)
  if (cached) {
    // return cached
  }

  // @ts-ignore
  const params = {
    "pagination[page]": 1,
    "pagination[pageSize]": 10,
    populate: "*",
    sort: "name",
    "filters[image_url][$eq]": "ipfs://" + image,
  }

  console.log(params)
  const nftsResponse = await axios.get(`${apiURL}/api/nfts`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  cache.set(cacheKey, nftsResponse.data.data[0])
  return nftsResponse.data.data[0]
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
