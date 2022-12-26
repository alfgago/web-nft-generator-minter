import { NextApiRequest, NextApiResponse } from "next"

import {
  setSaleState,
  SetSaleStateParams,
} from "@/utils/SmartContracts/setSaleState"

import "dotenv/config"

type SetSaleStateRequestBody = SetSaleStateParams

interface SetSaleStateRequest extends NextApiRequest {
  body: SetSaleStateRequestBody
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

    const transactionHash = await setSaleState({
      contractAddress,
      network,
      saleState,
    })

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
