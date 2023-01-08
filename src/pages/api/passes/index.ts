import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const fetchData = async ({ page, limit = 6 }: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const today = new Date()
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0") // January is 0!
  const yyyy = today.getFullYear()
  const todayString = 2020 + "-" + mm + "-" + dd // Temporalmente usando 2020, porque de lo contrario no muestra datos, mientras llenamos BD

  const response = await axios.get(`${apiURL}/api/passes`, {
    params: {
      "pagination[page]": page,
      "pagination[pageSize]": limit,
      populate: "artist.banner,event,tour,collection_preview_image",
      sort: "drop_date:desc",
      "filters[drop_date][$gte]": todayString,
      "filters[pass_type][$eq]": "Lottery",
    },
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
