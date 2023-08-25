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

    console.log({
      name: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      username: values.email,
      blocked: false,
      password: "NOLOGIN",
      wallet: values.user?.walletAddress,
      paperWalletId: values.user?.authDetails?.userWalletId ?? "",
    })

    const user = await strapi.create("users", {
      name: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      username: values.email,
      blocked: false,
      password: "NOLOGIN",
      wallet: values.user?.walletAddress,
      paperWalletId: values.user?.authDetails?.userWalletId ?? "",
      role: 1,
    })

    return user
  } catch (e) {
    console.log(e.error.details)
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
