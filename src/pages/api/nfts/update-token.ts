import { NextApiRequest, NextApiResponse } from "next"
import Strapi from "strapi-sdk-js"

const updateToken = async (values: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
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

  const nft = await strapi.update("nfts", values.id, {
    ipfs_token: values.ipfs_token,
  })

  return nft
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await updateToken(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
