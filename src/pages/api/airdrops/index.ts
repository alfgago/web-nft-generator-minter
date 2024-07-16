import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import "dotenv/config"

type AirdropRequestBody = {
  contractAddress: string
  network: string
  toWalletAddress: string
  nftId: string
}

interface AirdropRequest extends NextApiRequest {
  body: AirdropRequestBody
}

type ErrResponseBody = {
  err: string
}

type AirdropResponseBody =
  | {
      transactionHash: string
    }
  | ErrResponseBody

export default async function handler(
  req: AirdropRequest,
  res: NextApiResponse<AirdropResponseBody>
) {
  try {
    const { contractAddress, network, toWalletAddress, nftId } = req.body

    const sdk = new ThirdwebSDK(network)
    const contract = await sdk.getNFTCollection(contractAddress)
    const transaction = await contract.transfer(toWalletAddress, nftId)

    res
      .status(200)
      .json({ transactionHash: transaction.receipt.transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
