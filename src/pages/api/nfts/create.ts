import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"

const uploadFolder = async ({ folderName, metadatas }: any) => {
  // Initialize Thirdweb SDK
  const sdk = new ThirdwebSDK("goerli") // Use the appropriate network
  const storage = sdk.storage

  // Prepare metadata array
  const metadataArray = JSON.parse(metadatas)

  // Prepare files to upload
  const files = metadataArray.map((metadata: any, index: number) => ({
    path: `${folderName}/${index}`,
    content: JSON.stringify(metadata),
  }))

  // Upload files to IPFS
  const cid = await storage.uploadBatch(files)
  console.log(`Folder uploaded with CID:`, cid)

  return cid
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cid = await uploadFolder(req.body)
    res.status(200).json({ cid: cid })
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
