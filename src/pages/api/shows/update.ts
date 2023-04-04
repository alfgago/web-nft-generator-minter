import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import Strapi from "strapi-sdk-js"

interface Payload {
  name: string
  date: string
  venue_name: string
  country: string
  city: string
  giveaway_slots: number
  confirmed: boolean
  image?: string // Make the image property optional
}

const updateShow = async (values: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const strapi = new Strapi({
    url: apiURL,
    prefix: "/api",
    store: {
      key: "strapi_jwt",
      useLocalStorage: false,
      cookieOptions: { path: "/" },
    },
    axiosOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const payload: Payload = {
    name: values.name,
    date: values.date,
    venue_name: "",
    country: values.country,
    city: values.city,
    giveaway_slots: values.giveaway_slots,
    confirmed: true,
  }
  if (values.image) {
    payload.image = values.image
  }

  const event = await strapi.update("events", values.id, payload)

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
