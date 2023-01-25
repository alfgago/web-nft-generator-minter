import { MetaDataClient, NFTMetadata } from "@juicelabs/client"

// feel free to replace this token with
// your own from https://nft.storage/
const nftStorageApiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""

// pass nftMeta with image as data uri
// you will get back a CID for the metadata
export const updateNFTMeta = async (meta: NFTMetadata, ipfsKey: string) => {
  const metadataClient = new MetaDataClient(nftStorageApiKey)

  const { image, ...restOfMeta } = meta
  const finalMeta = {
    image: `ipfs://${ipfsKey}`,
    ...restOfMeta,
  }

  const metaCID = await metadataClient.uploadMeta(finalMeta)
  return metaCID
}
