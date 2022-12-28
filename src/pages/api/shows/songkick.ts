import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const fetchData = async (artist: any) => {
  const { data } = await axios.get(
    `https://api.songkick.com/api/3.0/artists/${artist}/calendar.json`,
    {
      params: {
        apikey: process.env.SONGKICK_API,
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
    const { artist } = req.query
    const data = await fetchData(artist)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
