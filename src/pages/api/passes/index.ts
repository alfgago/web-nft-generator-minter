import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const fetchData = async ({
  page,
  limit = 6,
  artist = 0,
  user = 0,
  type = false,
  future = true,
  sort = false,
}: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const today = new Date()
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0") // January is 0!
  const yyyy = today.getFullYear()
  const todayString = 2020 + "-" + mm + "-" + dd // Temporalmente usando 2020, porque de lo contrario no muestra datos, mientras llenamos BD

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    populate: "artist.banner,event,tour,collection_preview_image",
    sort: "drop_date:desc",
  }
  if (type && type != "All") {
    // @ts-ignore
    params["filters[pass_type][$eq]"] = type
  }
  if (future) {
    // @ts-ignore
    params["filters[drop_date][$gte]"] = todayString
  }
  if (artist) {
    // @ts-ignore
    params["filters[artist][id][$eq]"] = artist
  }
  if (user) {
    // @ts-ignore
    params["filters[artist][user][id][$eq]"] = user
  }
  if (sort) {
    // @ts-ignore
    params["sort[0]"] = sort
  }

  const response = await axios.get(`${apiURL}/api/passes`, {
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
