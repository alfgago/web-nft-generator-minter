import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  page = 1,
  limit = 10,
  artist = 0,
  user = 0,
  type = false,
  future = false,
  sort = false,
  eventDate = false,
}: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const cacheKey = `passes_${page}_${limit}_${artist}_${user}_${type}_${future}_${sort}`
  const cached = cache.get(cacheKey)
  if (cached) {
    return cached
  }

  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": limit,
    populate: "artist.banner,event.image,tour,collection_preview_image",
    sort: "drop_date:desc",
  }
  if (type && type != "All") {
    // @ts-ignore
    params["filters[pass_type][$eq]"] = type
  }
  if (future) {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0") // January is 0!
    const yyyy = today.getFullYear()
    const todayString = yyyy + "-" + mm + "-" + dd // Temporalmente usando 2020, porque de lo contrario no muestra datos, mientras llenamos BD
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
  if (eventDate) {
    // @ts-ignore
    params["filters[event][date][$gte]"] = eventDate
  }
  // @ts-ignore
  params["filters[contract_address][$notNull]"] = true

  const response = await axios.get(`${apiURL}/api/passes`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  cache.set(cacheKey, response.data)
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
