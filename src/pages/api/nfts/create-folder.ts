import { NextApiRequest, NextApiResponse } from "next"
import { filesFromPath } from "files-from-path"
import fs from "fs"
import { NFTStorage } from "nft.storage"
import path from "path"

const uploadFolder = async ({ folderName, metadatas }: any) => {
  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""
  const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN })

  // Removes the folder from local storage if already exists
  removeDir(folderName)
  // Creates a new folder where NFTs will be located
  fs.mkdirSync(folderName)

  const files = filesFromPath(folderName, {
    pathPrefix: path.resolve(folderName), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  })

  const metadataArray = JSON.parse(metadatas)
  for (let i = 0; i < metadataArray.length; i += 1) {
    // convert the object to a string
    const jsonString = JSON.stringify(metadataArray[i])
    // write the string to a file
    fs.writeFileSync(`${folderName}/${metadataArray[i].order}`, jsonString)
  }

  // upload the folder to IPFS
  const cid = await storage.storeDirectory(files)
  console.log(`Folder uploaded with CID:`, cid)

  const status = await storage.status(cid)
  console.log("Store Status: ", status)

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
