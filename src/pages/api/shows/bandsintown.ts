import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import axios from "axios"

const sdk = new ThirdwebSDK("mainnet")

const fetchData = async (artist: string) => {
  const { data } = await axios.get(
    `https://rest.bandsintown.com/artists/${artist}/events?app_id=${process.env.BANDSINTOWN_API}`
  )

  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { artist } = req.query
    if (!artist || typeof artist !== "string") {
      res.status(400).send({ err: "Invalid artist parameter" })
      return
    }

    const data = await fetchData(artist)
    res.status(200).json(data)
  } catch (e) {
    res.status(500).send({ err: "There was an error fetching the data" })
  }
}
