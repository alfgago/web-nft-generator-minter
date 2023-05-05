import { NextApiRequest, NextApiResponse } from "next"

import { bulkMint, BulkMintParams } from "@/utils/SmartContracts/mint"

import "dotenv/config"

type BulkMintRequestBody = BulkMintParams

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

    const transactionHash = await bulkMint({
      contractAddress,
      network,
      toAddress: toJuice
        ? process.env.JUICE_WALLET_ADDRESS ?? ""
        : process.env.ADMIN_WALLET_ADDRESS ?? "",
      count,
    })

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
