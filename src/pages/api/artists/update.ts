import { NextApiResponse } from "next"
import Strapi from "strapi-sdk-js"

const updateArtist = async ({
  artist,
  bio,
  genre,
  spotify,
  facebook,
  youtube,
  instagram,
  twitter,
  members,
}: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const strapi = new Strapi({
    url: apiURL,
    prefix: "/api",
    store: {
      key: "strapi_jwt",
      useLocalStorage: false,
      cookieOptions: { path: "/" },
    },
    axiosOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const params = {
    bio,
    genre,
    spotify,
    facebook,
    youtube,
    instagram,
    twitter,
    members,
  }

  const updatedArtist = await strapi.update("artists", artist, params)

  return updatedArtist
}

export default async function handler(req: any, res: NextApiResponse) {
  try {
    const data = await updateArtist(req.body)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
