/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 10 }) // cache for 60 seconds

const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
const token = process.env.API_TOKEN

const sdk = new ThirdwebSDK("mainnet")

const getWinners = async ({ page = 1, limit = 10 }: any) => {
  const cacheKey = `drop_winners_${page}_${limit}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const contract = await sdk.getContract("your-contract-address")
  const participantsResponse = await contract.call(
    "getAirdropWinners",
    page,
    limit
  )

  cache.set(cacheKey, participantsResponse)

  return participantsResponse
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
