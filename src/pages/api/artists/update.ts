import { NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

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
  const apiURL =
    process.env.NEXT_PUBLIC_THIRDWEB_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
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

  const updatedArtist = await sdk.update("artists", artist, params)

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
