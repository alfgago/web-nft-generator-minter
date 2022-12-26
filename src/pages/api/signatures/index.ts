import { NextApiRequest, NextApiResponse } from "next"

import { deployContract } from "@/utils/SmartContracts/deployContract"
import { MintDataForSignature, signMintData } from "@/utils/SmartContracts/mint"
import { Network } from "@juicelabs/client"

type CreateSignatureRequestBody = {
  mintData: MintDataForSignature
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
    const signature = await signMintData(network, contractAddress, mintData)
    res.status(200).json({ signature })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
