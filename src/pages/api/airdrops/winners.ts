/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 10 }) // cache for 60 seconds

const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
const token = process.env.API_TOKEN

/**
 * Retrieves the winners of an airdrop, with pagination and caching.
 * @param {Object} options - The options for retrieving the winners.
 * @param {number} [options.page=1] - The page number of the winners to retrieve.
 * @param {number} [options.limit=10] - The number of winners to retrieve per page.
 * @returns {Promise<{ data: any[], meta: { pagination: { page: number, pageSize: number, pageCount: number, total: number } } }>} - The winners and pagination information.
 */
const getWinners = async ({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
}): Promise<{
  data: any[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}> => {
  const cacheKey = `drop_winners_${page}_${limit}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const participantsResponse = await axios.get(`${apiURL}/api/airdrops`, {
    params: {
      "pagination[page]": page,
      "pagination[pageSize]": limit,
      populate:
        "airdropped_nft.art,airdropped_nft.pass_collection.event,winner",
      sort: "createdAt:desc",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  // TODO: Implement caching for the response
  cache.set(cacheKey, participantsResponse.data)

  return participantsResponse.data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getWinners(req.query)
    res.status(200).json(data)
  } catch (e: any) {
    console.log(e)
    res.status(400).send({ e: e, err: e.message })
  }
}
