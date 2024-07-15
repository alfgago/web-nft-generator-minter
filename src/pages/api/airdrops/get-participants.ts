/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 10 }) // cache for 60 seconds

const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
const token = process.env.API_TOKEN

/**
 * Fetches participants data for a given event from the API.
 * If the data is not in the cache, it makes a request to the API and caches the response.
 * If the request fails, it tries to get the data from the cache.
 * @param event - The event ID for which to fetch participants data.
 * @returns A Promise that resolves to the participants data for the given event.
 * @throws {Error} If the request to the API fails and the data is not in the cache.
 */
const getParticipants = async ({
  event,
}: {
  event: string
}): Promise<IParticipant[]> => {
  const cacheKey = `participants_${event}`
  const cached = cache.get<IParticipant[]>(cacheKey)
  if (cached) {
    return cached
  }

  try {
    const response = await axios.get<IParticipant[]>(
      `${apiURL}/api/giveaway-participants`,
      {
        params: {
          "filters[event][id][$eq]": event,
          populate: "circle_nft",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const participantsData = response.data
    cache.set(cacheKey, participantsData)
    return participantsData
  } catch (error) {
    // If the request fails, try to get the data from the cache
    const cachedData = cache.get<IParticipant[]>(cacheKey)
    if (cachedData) {
      return cachedData
    }
    throw error
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getParticipants(req.query)
    res.status(200).json(data)
  } catch (e: any) {
    console.log(e)
    res.status(400).send({ e: e, err: e.message })
  }
}
