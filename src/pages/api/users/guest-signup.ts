import { NextApiRequest, NextApiResponse } from "next"
import Strapi from "strapi-sdk-js"

const createUser = async (values: any) => {
  try {
    const apiURL =
      process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
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
      name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phoneNumber,
      wallet: values.wallet,
      paper_wallet_id: values.paper_id ?? "",
      signup_type: values?.signup_type ?? "paper",
    }

    const user = await strapi.create("guests", params)

    return user
  } catch (e) {
    console.log(e)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createUser(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
