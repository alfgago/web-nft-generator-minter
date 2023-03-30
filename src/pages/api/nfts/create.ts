import { NextApiRequest, NextApiResponse } from "next"
import Strapi from "strapi-sdk-js"

const createNft = async (values: any) => {
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

  const nft = await strapi.create("nfts", {
    name: values.name,
    image_url: values.image_url,
    ipfs_token: values.premint ? "" : values.ipfs_token,
    pass_collection: values.pass_id,
    order: values.order,
    metadata: values.metadata,
    is_minted: values.premint,
  })

  return nft
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createNft(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
