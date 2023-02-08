import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const fetchData = async ({ user = 0, nft = 0 }: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const params = {
    populate: "*",
  }

  if (user) {
    // @ts-ignore
    params["filters[user][id][$eq]"] = user
  }

  if (nft) {
    // @ts-ignore
    params["filters[id][$eq]"] = nft
  }

  const response = await axios.get(`${apiURL}/api/nfts`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
