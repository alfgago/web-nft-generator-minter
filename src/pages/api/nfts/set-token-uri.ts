import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

import { setTokenURI, TokenUriParams } from "@/utils/SmartContracts/setTokenUri"

import "dotenv/config"

type ErrResponseBody = {
  err: string
}

type AirdropResponseBody =
  | {
      transactionHash: string
    }
  | ErrResponseBody

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AirdropResponseBody>
) {
  try {
    const { contractAddress, network, tokenId, metadataCid, nftId } = req.body

    axios.post(process.env.NEXT_PUBLIC_DOMAIN + "/api/nfts/update-status", {
      id: nftId,
      mint_order: tokenId,
    })

    /* const transactionHash = await setTokenURI({
      contractAddress,
      network,
      tokenId,
      metadataCid,
    })

    console.log(transactionHash)*/

    res.status(200).json({ transactionHash: "transactionHash" })
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "Bad Request:" + e })
  }
}
