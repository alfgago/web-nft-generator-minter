import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 10 }) // cache for 10 seconds

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

const isMinted = async (contractAddress: string, order: number) => {
  const alchemyToken = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const alchemyDomain =
    process.env.NEXT_PUBLIC_NETWORK == "goerli"
      ? "https://eth-goerli.g.alchemy.com"
      : "https://polygon-mainnet.g.alchemy.com"

  const cacheKey = `getNFTsForCollection_${contractAddress}`

  let getNFTsForCollection = cache.get(cacheKey)

  if (!getNFTsForCollection) {
    getNFTsForCollection = []
    try {
      const response = await axios.get(
        `${alchemyDomain}/nft/v2/${alchemyToken}/getNFTsForCollection?contractAddress=${contractAddress}&withMetadata=true`
      )
      getNFTsForCollection = response?.data?.nfts ?? []
    } catch (e) {
      console.log(e)
    }
    cache.set(cacheKey, getNFTsForCollection)
  }

  console.log(getNFTsForCollection[order - 1])
  const gateway = getNFTsForCollection[order - 1]?.tokenUri?.gateway ?? ""
  return gateway
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AirdropResponseBody>
) {
  try {
    const {
      contractAddress,
      network,
      tokenId,
      metadataCid,
      nftId,
      transactionId,
    } = req.body
    const hash = await isMinted(contractAddress, parseInt(tokenId))
    // const hash = ""
    if (!hash.length) {
      axios.post(process.env.NEXT_PUBLIC_DOMAIN + "/api/nfts/update-status", {
        id: nftId,
        mint_order: tokenId,
        paper_transaction_id: transactionId,
      })

      const tokenUriParams = {
        contractAddress,
        network,
        tokenId,
        metadataCid: "ipfs://" + metadataCid,
      }
      console.log(tokenUriParams)

      const transactionHash = await setTokenURI(tokenUriParams)

      console.log("transactionHash")
      console.log(transactionHash)

      res.status(200).json({ transactionHash: transactionHash })
    } else {
      res.status(200).json({ transactionHash: hash })
    }
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "Bad Request:" + e })
  }
}
