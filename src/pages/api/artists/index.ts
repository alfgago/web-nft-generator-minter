import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const fetchData = async ({
  page = 1,
  limit = 2,
  random = false,
  user = 0,
  sort = false,
}: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    populate: "banner,profile_picture,passes,events,members.nft_default_image",
    randomSort: random,
  }
  if (user) {
    // @ts-ignore
    params["filters[user][id][$eq]"] = user
  }
  if (sort) {
    // @ts-ignore
    params["sort[0]"] = sort
  }

  const response = await axios.get(`${apiURL}/api/artists`, {
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
