import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import "dotenv/config"

interface SetSaleStateRequest extends NextApiRequest {
  body: {
    contractAddress: string
    network: string
    saleState: boolean
  }
}

type ErrResponseBody = {
  err: string
}

type SetSaleStateResponseBody =
  | {
      transactionHash: string
    }
  | ErrResponseBody

export default async function handler(
  req: SetSaleStateRequest,
  res: NextApiResponse<SetSaleStateResponseBody>
) {
  try {
    const { contractAddress, network, saleState } = req.body

    const sdk = new ThirdwebSDK(network)
    const contract = await sdk.getContract(contractAddress)

    const transaction = await contract.call("setSaleState", saleState)
    const transactionHash = transaction.receipt.transactionHash

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
