import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import Strapi from "strapi-sdk-js"

const createGuestList = async (values: any) => {
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
    "pagination[page]": 1,
    "pagination[pageSize]": 1,
    "filters[event][id][$eq]": values.event,
    "filters[nft][id][$eq]": values.nft,
  }

  const response = await axios.get(`${apiURL}/api/guest-lists`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  let guestList
  const guestListData = {
    event: values.event,
    nft: values.nft,
    name: values.name,
    email: values.email,
    name2: values.name2,
    email2: values.email2,
  }
  if (response?.data?.data?.length) {
    guestList = response.data.data[0]
    await strapi.update("guest-lists", guestList.id, guestListData)
  } else {
    guestList = await strapi.create("guest-lists", guestListData)
  }

  return guestList
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createGuestList(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
