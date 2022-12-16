import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const fetchData = async ({ page, limit = 3 }: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN
  const nftsResponse = await axios.get(`${apiURL}/api/nfts`, {
    params: {
      "pagination[page]": page,
      "pagination[pageSize]": limit,
      populate: "*",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return nftsResponse.data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
