import { MetaDataClient, NFTMetadata } from "@juicelabs/client"

const nftStorageApiKey = process.env.NEXT_NFT_STORAGE_API_KEY || ""

// pass nftMeta with image as data uri
// you will get back a CID for the metadata
export const uploadNFTMeta = async (meta: NFTMetadata) => {
  const metadataClient = new MetaDataClient(nftStorageApiKey)

  const { image, ...restOfMeta } = meta

  const imageCID = await metadataClient.uploadDataUri(image)

  const finalMeta = {
    image: `ipfs://${imageCID}`,
    ...restOfMeta,
  }

  const metaCID = await metadataClient.uploadMeta(finalMeta)
  return metaCID
}
