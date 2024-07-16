import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const createGuestList = async (values: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const guestListContract = await sdk.getContract("Guest-Lists")

  const guest = await guestListContract.call("createGuestList", {
    event: values.event,
    Guests: [
      {
        nft: values.nft,
        name: values.name,
        email: values.email,
        __component: "general.guest",
      },
    ],
  })

  return guest
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createGuestList(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
