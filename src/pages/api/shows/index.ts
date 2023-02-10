import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const fetchData = async ({
  page = 1,
  limit = 10,
  artist = 0,
  user = 0,
  passType = false,
  passId = 0,
  deep = false,
  nft = 0,
}: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
  }
  if (artist) {
    // @ts-ignore
    params["filters[artist][id][$eq]"] = artist
  }
  if (user) {
    // @ts-ignore
    params["filters[artist][user][id][$eq]"] = user
  }

  if (passType) {
    // @ts-ignore
    params["filters[passes][pass_type][$eq]"] = passType
  }

  if (passId) {
    // @ts-ignore
    params["filters[passes][id][$eq]"] = passId
  }

  if (nft) {
    // @ts-ignore
    params["filters[passes][nfts][id][$eq]"] = nft
  }

  if (deep) {
    // @ts-ignore
    params["populate"] = "deep," + deep
  }

  const response = await axios.get(`${apiURL}/api/events`, {
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
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
