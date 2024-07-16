import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import "dotenv/config"

type BulkMintRequestBody = {
  contractAddress: string
  network: string
  count: number
  toJuice?: boolean
}

interface BulkMintRequest extends NextApiRequest {
  body: BulkMintRequestBody
}

type ErrResponseBody = {
  err: string
}

type BulkMintResponseBody =
  | {
      transactionHash: string
    }
  | ErrResponseBody

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BulkMintResponseBody>
) {
  try {
    const { contractAddress, network, count, toJuice = false } = req.body

    const sdk = new ThirdwebSDK(network)
    const contract = await sdk.getContract(contractAddress)

    const toAddress = toJuice
      ? process.env.JUICE_WALLET_ADDRESS ?? ""
      : process.env.ADMIN_WALLET_ADDRESS ?? ""

    const transaction = await contract.erc721.mintBatch(toAddress, count)
    const transactionHash = transaction.receipt.transactionHash

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
