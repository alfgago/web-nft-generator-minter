import { NextApiRequest, NextApiResponse } from "next"

const fetchData = async ({
  price,
  title,
  imageUrl,
  order = 0,
  metadataCid,
  contractId = "0494c9c2-b05e-4d13-9d1b-cee6a878b3ee",
  nftId,
  contractAddress,
}: any) => {
  const callbackUrl = `${process.env.DOMAIN}
    /pass/${contractAddress}?metadataCid=${metadataCid}
    &nftId=${nftId}
    `

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
      imageUrl: imageUrl ?? "",
      limitPerTransaction: 1,
      redirectAfterPayment: true,
      successCallbackUrl: callbackUrl,
      mintMethod: {
        name: "claimTo",
        args: {
          to: "$WALLET",
          quantity: "$QUANTITY",
          tokenId: order,
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
