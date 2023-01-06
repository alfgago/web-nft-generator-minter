import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const createShow = async (eventData: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const { data } = await axios.post(
    `${apiURL}/api/events`,
    {
      name: eventData.name,
      date: eventData.date,
      address: eventData.address,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      artist: eventData.artist,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createShow(req.body)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error saving the data" })
  }
}
