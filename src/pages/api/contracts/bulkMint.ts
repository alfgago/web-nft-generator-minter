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
  req: BulkMintRequest,
  res: NextApiResponse<BulkMintResponseBody>
) {
  try {
    const { contractAddress, network, count, toAddress } = req.body

    const transactionHash = await bulkMint({
      contractAddress,
      network,
      toAddress,
      count,
    })

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
