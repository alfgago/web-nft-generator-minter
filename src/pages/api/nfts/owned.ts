import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 10 }) // cache for 10 seconds

const fetchData = async ({ address }: any) => {
  const token = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

  const cacheKey = `owned_nfts_${address}`
  const ownedNfts = cache.get(cacheKey)
  if (ownedNfts) {
    return ownedNfts
  }

  const alchemyDomain =
    process.env.NEXT_PUBLIC_NETWORK == "goerli"
      ? "https://eth-goerli.g.alchemy.com"
      : "https://polygon-mainnet.g.alchemy.com"

  const response = await axios.get(
    `${alchemyDomain}/nft/v2/${token}/getNFTs?owner=${address}`
  )

  const nfts = filterNfts(response.data.ownedNfts)
  cache.set(cacheKey, nfts)
  return nfts
}

// Filters the owned NFTs, to only get the PlusOne ones
function filterNfts(array: any) {
  return array.filter(function (obj: any) {
    return obj.contractMetadata?.symbol === "P1" && obj.media[0].gateway
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data", e })
  }
}
