import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const createShow = async (values: any) => {
  const apiURL =
    process.env.NEXT_PUBLIC_THIRDWEB_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const contract = await sdk.getContract("events")

  const event = await contract.create({
    name: values.name,
    date: values.date,
    venue_name: "",
    image: values.image ?? null,
    country: values.country,
    city: values.city,
    artist: values.artist,
    giveaway_slots: values.giveaway_slots,
    confirmed: true,
    doors_time: values.doors_time,
    deadline_hours: values.deadline_hours,
    age_restriction: values.age_restriction,
  })

  return event
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createShow(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
