import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import "dotenv/config"

type DevMintRequestBody = {
  network: string
  contractAddress: string
  metadataCid: string
}

interface DevMintRequest extends NextApiRequest {
  body: DevMintRequestBody
}

type ErrResponseBody = {
  err: string
}

type DevMintResponseBody =
  | {
      transactionHash: string
    }
  | ErrResponseBody

export default async function handler(
  req: DevMintRequest,
  res: NextApiResponse<DevMintResponseBody>
) {
  try {
    const { network, contractAddress, metadataCid } = req.body

    const sdk = new ThirdwebSDK(network)
    const contract = await sdk.getContract(contractAddress)
    const transaction = await contract.erc721.mint({
      metadata: {
        cid: metadataCid,
      },
      to: process.env.JUICE_WALLET_ADDRESS || "0x",
    })

    res
      .status(200)
      .json({ transactionHash: transaction.receipt.transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
