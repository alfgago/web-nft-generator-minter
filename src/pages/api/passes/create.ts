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

  const pass = await strapi.create("passes", {
    collection_name: values.name,
    contract_address: values.contract_address
      ? values.contract_address
      : "NO-KEY-YET",
    collection_size: values.size,
    drop_date: values.dropDate,
    initial_price: values.price,
    royalty_wallet_address: values.wallet,
    artist: values.artist ? values.artist : null,
    tour: values.tour ? values.tour : null,
    event: values.event ? values.event : null,
    pass_type: values.passType,
    sale_type: values.saleType,
    is_lottery: values.passType == "Lottery",
    preview_image_url: values.preview_image_url,
    is_charity: values.is_charity,
    charity_name: values.charity_name,
    charity_royalty: values.charity_royalty,
    description: "",
  })

  return pass
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
