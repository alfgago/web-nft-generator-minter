import { NextApiRequest, NextApiResponse } from "next"

import { DevMintParams } from "@/utils/SmartContracts/mint"
import { devMint } from "@/utils/SmartContracts/mint"

import "dotenv/config"

type DevMintRequestBody = DevMintParams

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

    const transactionHash = await devMint({
      network,
      contractAddress,
      metadataCid,
      toAddress: process.env.JUICE_WALLET_ADDRESS || "0x",
    })

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
