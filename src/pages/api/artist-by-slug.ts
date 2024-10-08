import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const fetchData = async ({ slug }: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const response = await sdk.get(`/api/artists`, {
    params: {
      populate: "banner,events.passes",
      "filters[slug][$eq]": slug,
    },
  })

  if (response.data) {
    return {
      props: {
        artist: response.data.data[0],
      },
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
