import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

const fetchData = async ({
  price,
  title,
  imageUrl,
  order,
  contractId = "ffc34116-6fb3-46a0-b59c-71192adfb85f",
}: any) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "Bearer 96e2b098-4661-4810-8b16-2b633ffa2e81",
    },
    body: JSON.stringify({
      contractId: contractId,
      title: title,
      imageUrl: imageUrl,
      mintMethod: {
        name: "claimTo",
        args: {
          _to: "$WALLET",
          _quantity: "$QUANTITY",
          _tokenId: order,
        },
        payment: {
          value: price + " * $QUANTITY",
          currency: "ETH",
        },
      },
    }),
  }

  try {
    const response = await fetch(
      "https://withpaper.com/api/2022-08-12/checkout-link-intent",
      options
    )
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.body)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
