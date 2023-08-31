import { NextApiRequest, NextApiResponse } from "next"
import Strapi from "strapi-sdk-js"

const updateMintStatus = async (values: any) => {
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
  const params = {
    is_minted: true,
    mint_order: parseInt(values.mint_order ?? 0),
  }
  console.log(params)
  const nft = await strapi.update("nfts", values.id, params)
  console.log(nft)

  return nft
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await updateMintStatus(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
