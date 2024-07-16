import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"

interface Payload {
  name: string
  date: string
  venue_name: string
  country: string
  city: string
  giveaway_slots: number
  confirmed: boolean
  image?: string // Make the image property optional
  doors_time: string
  deadline_hours: number
  age_restriction: string
}

const updateShow = async (values: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const provider = new ethers.providers.JsonRpcProvider(apiURL)
  const wallet = new ethers.Wallet(token, provider)
  const sdk = new ThirdwebSDK(wallet)

  const payload: Payload = {
    name: values.name,
    date: values.date,
    venue_name: "",
    country: values.country,
    city: values.city,
    giveaway_slots: values.giveaway_slots,
    confirmed: true,
    doors_time: values.doors_time,
    deadline_hours: values.deadline_hours,
    age_restriction: values.age_restriction,
  }
  if (values.image) {
    payload.image = values.image
  }

  const contract = await sdk.getContract("events")
  const event = await contract.call("updateEvent", values.id, payload)

  return event
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await updateShow(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
