import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const subscribeParticipant = async (values: any) => {
  const apiURL =
    process.env.NEXT_PUBLIC_THIRDWEB_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const params = {
    wallet: values.wallet,
    email: values.email ?? null,
    event: values.event,
    circle_nft: values.circle_nft,
  }

  const participant = await sdk.create("giveaway-participants", params)

  return participant
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await subscribeParticipant(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
