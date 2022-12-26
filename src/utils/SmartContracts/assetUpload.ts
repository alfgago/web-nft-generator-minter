import { MetaDataClient, NFTMetadata } from "@juicelabs/client"

// feel free to replace this token with
// your own from https://nft.storage/
const nftStorageApiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJhODdhNGVGQjQ1NzZFZTlmRThDNEJkZEIzNTAyN2EzZkU0QjMyQTUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MTE0NDM1MzQzMCwibmFtZSI6InBsdXMgb25lIGV4YW1wbGUifQ.HO9hqthV-1Urboi3jA_DVgMw9IukZey7spsnRIjMNVA"

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
