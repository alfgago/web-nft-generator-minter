import { NextApiRequest, NextApiResponse } from "next"

import { airdropNFT, AirdropParams } from "@/utils/SmartContracts/airdropNFT"

import "dotenv/config"

type AirdropRequestBody = AirdropParams

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

    const transactionHash = await airdropNFT({
      contractAddress,
      network,
      toWalletAddress,
      nftId,
    })

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
