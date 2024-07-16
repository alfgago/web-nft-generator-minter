import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  page = 1,
  limit = 99,
  passType = false,
  nftImage = false,
}: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `artistbynft_${page}_${limit}_${passType}_${nftImage}`
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
    populate: "events.passes",
  }
  if (passType) {
    params["filters[passes][pass_type][$eq]"] = passType
  }

  if (nftImage) {
    params["filters[passes][nfts][image_url][$eq]"] = nftImage
  }

  const response = await sdk.api.get(`/api/artists`, {
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
