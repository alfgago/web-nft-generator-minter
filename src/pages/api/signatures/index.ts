import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { Network } from "@thirdweb-dev/sdk"

import "dotenv/config"

type CreateSignatureRequestBody = {
  mintData: any
  network: Network
  contractAddress: string
}

interface CreateSignatureRequest extends NextApiRequest {
  body: CreateSignatureRequestBody
}

type ErrResponseBody = {
  err: string
}

type CreateSignatureResponseBody =
  | {
      signature: string
    }
  | ErrResponseBody

export default async function handler(
  req: CreateSignatureRequest,
  res: NextApiResponse<CreateSignatureResponseBody>
) {
  try {
    const { mintData, network, contractAddress } = req.body
    const sdk = new ThirdwebSDK(network)
    const contract = await sdk.getContract(contractAddress)
    const signature = await contract.signature.generate(mintData)

    res.status(200).json({ signature })
  } catch (e) {
    console.log("Mint Error")
    console.log(e)
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
