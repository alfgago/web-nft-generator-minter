import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import Strapi from "strapi-sdk-js"

const createShow = async (values: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
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

  const event = await strapi.create("events", {
    name: values.name,
    date: values.date,
    address: values.address,
    venue_name: "",
    description: "",
    latitude: values.latitude,
    longitude: values.longitude,
    artist: values.artist,
    confirmed: true,
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
