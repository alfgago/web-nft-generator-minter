/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 10 }) // cache for 60 seconds

const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
const token = process.env.API_TOKEN

const sdk = new ThirdwebSDK("mainnet")

const getParticipants = async ({ event }: any) => {
  const cacheKey = `participants_${event}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const participantsResponse = await sdk.api.get(
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
  cache.set(cacheKey, participantsResponse.data)

  return participantsResponse.data
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
