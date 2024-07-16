import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import { ThirdwebStorage } from "@thirdweb-dev/sdk"

const uploadFolder = async ({ folderName, metadatas }: any) => {
  // Initialize Thirdweb Storage
  const storage = new ThirdwebStorage()

  // Removes the folder from local storage if already exists
  removeDir(folderName)
  // Creates a new folder where NFTs will be located
  fs.mkdirSync(folderName)

  const metadataArray = JSON.parse(metadatas)
  for (let i = 0; i < metadataArray.length; i += 1) {
    // convert the object to a string
    const jsonString = JSON.stringify(metadataArray[i])
    // write the string to a file
    fs.writeFileSync(`${folderName}/${metadataArray[i].order}`, jsonString)
  }

  // Prepare files to upload
  const files = fs.readdirSync(folderName).map((file) => ({
    path: `${folderName}/${file}`,
    content: fs.readFileSync(`${folderName}/${file}`),
  }))

  // Upload files to IPFS
  const cid = await storage.uploadBatch(files)
  console.log(`Folder uploaded with CID:`, cid)

  // Removes the folder from local storage
  removeDir(folderName)
  return cid
}

const removeDir = (folderName: string) => {
  // Removes the folder from local storage
  if (fs.existsSync(folderName)) {
    fs.rmdirSync(folderName, { recursive: true })
    console.log(`${folderName} has been removed`)
  } else {
    console.log(`Checking foldername: ${folderName} does not exist.`)
  }
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
