import axios from "axios"
import { NFTStorage } from "nft.storage"

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""
const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN })
const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"

export const storeNftMeta = async (metadata: any) => {
  console.log("storeNftMeta")
  console.log(metadata)
  const metadataBuffer = Buffer.from(JSON.stringify(metadata))
  const response = await axios.post(
    "https://api.nft.storage/upload",
    metadataBuffer,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
        "X-Client-Metadata": metadata,
      },
    }
  )
  const cid = response.data.value.cid
  return cid
}
