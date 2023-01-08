import { NextApiRequest, NextApiResponse } from "next"
import Strapi from "strapi-sdk-js"

const createPass = async (values: any) => {
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

  const nft = await strapi.create("nfts", {
    name: values.name,
    contract_number: "NO-KEY-YET",
    image_url: values.image_url,
    ipfs_token: values.ipfs_token,
    pass_collection: values.pass_id,
  })

  return nft
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createPass(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
