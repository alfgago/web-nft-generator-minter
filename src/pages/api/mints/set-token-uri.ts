import { NextApiRequest, NextApiResponse } from "next"

import { setTokenURI, TokenUriParams } from "@/utils/SmartContracts/setTokenUri"

import "dotenv/config"

type TokenUriRequestBody = TokenUriParams

interface TokenUriRequest extends NextApiRequest {
  body: TokenUriRequestBody
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
  req: TokenUriRequest,
  res: NextApiResponse<AirdropResponseBody>
) {
  try {
    const { contractAddress, network, tokenId, metadataCid } = req.body

    const transactionHash = await setTokenURI({
      contractAddress,
      network,
      tokenId,
      metadataCid,
    })

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
