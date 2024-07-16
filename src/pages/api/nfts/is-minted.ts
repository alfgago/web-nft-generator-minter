import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import NodeCache from "node-cache"

const cache = new NodeCache({ stdTTL: 10 }) // cache for 10 seconds

const fetchData = async ({ contractAddress, tokenId }: any) => {
  const thirdwebApiKey = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY
  const network =
    process.env.NEXT_PUBLIC_NETWORK === "goerli" ? "goerli" : "polygon"

  const sdk = new ThirdwebSDK(network, { apiKey: thirdwebApiKey })

  const cacheKey = `is_minted_nfts_${contractAddress}_${tokenId}`
  const isOwned = cache.get(cacheKey)
  if (isOwned) {
    return isOwned
  }

  let minted = false
  try {
    const contract = await sdk.getContract(contractAddress, "nft-drop")
    const owners = await contract.erc721.getOwnerOf(tokenId)
    minted = owners ? owners : false
  } catch (e) {
    console.error(e)
    minted = false
  }

  cache.set(cacheKey, minted)
  return minted
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.body)
    res.status(200).json(data)
  } catch (e) {
    console.error(e)
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
