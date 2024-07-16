import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"
import axios from "axios"
import "dotenv/config"

const cache = new NodeCache({ stdTTL: 10 }) // cache for 10 seconds

type ErrResponseBody = {
  err: string
}

type AirdropResponseBody =
  | {
      transactionHash: string
    }
  | ErrResponseBody

const isMinted = async (
  contractAddress: string,
  tokenId: number,
  sdk: ThirdwebSDK
) => {
  const cacheKey = `getNFTsForCollection_${contractAddress}`

  let getNFTsForCollection = cache.get(cacheKey)

  if (!getNFTsForCollection) {
    getNFTsForCollection = []
    try {
      const contract = await sdk.getContract(contractAddress, "nft-collection")
      const nfts = await contract.erc721.getAll()
      getNFTsForCollection = nfts
    } catch (e) {
      console.error(e)
    }
    cache.set(cacheKey, getNFTsForCollection)
  }

  const gateway = getNFTsForCollection[tokenId - 1]?.metadata?.image ?? ""
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

    // Initialize Thirdweb SDK
    const sdk = ThirdwebSDK.fromNetwork(
      network === "goerli" ? "goerli" : "polygon"
    )

    const hash = await isMinted(contractAddress, parseInt(tokenId), sdk)
    if (!hash.length) {
      // Update NFT status in our database
      await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/nfts/update-status`,
        {
          id: nftId,
          mint_order: tokenId,
          paper_transaction_id: transactionId,
        }
      )

      const contract = await sdk.getContract(contractAddress, "nft-collection")
      const metadata = {
        name: `Token #${tokenId}`,
        description: `Metadata for token #${tokenId}`,
        image: `ipfs://${metadataCid}`,
      }
      const transactionHash = await contract.erc721.mintTo(
        contractAddress,
        metadata
      )

      console.log("transactionHash", transactionHash)

      res.status(200).json({ transactionHash })
    } else {
      console.log("transactionId", transactionId, " Already minted")
      res.status(200).json({ transactionHash: hash })
    }
  } catch (e) {
    console.error(e)
    res.status(400).send({ err: `Bad Request: ${e}` })
  }
}
