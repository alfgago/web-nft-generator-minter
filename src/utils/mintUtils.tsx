import axios from "axios"
import { NFTStorage } from "nft.storage"

import cleanUrl from "@/utils/cleanUrl"
import { MetaDataClient } from "@juicelabs/client"

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""
const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export const uploadFolder = async (contractAddress: string, metadatas: any) => {
  const { data } = await axios.post("/api/nfts/create-folder", {
    folderName: contractAddress,
    metadatas: JSON.stringify(metadatas),
  })

  return data.cid
}

export const uploadNft = async (
  image: any,
  passId: any,
  index: any,
  metadatas: any,
  formValues: any,
  nftTitle: any
) => {
  const order = index + 1
  const blob = b64toBlob(image)
  const file = new File([blob], order + ".jpg")

  const name = formValues.name + " " + order
  const desc = "PlusOne NFT for " + nftTitle

  const premint = formValues.saleType == "Auction"
  const storageResponse = await storage.store({
    name: name,
    description: desc,
    image: file,
  })
  const imageUrl = storageResponse.data.image.href

  const metadata = {
    name: name,
    description: desc,
    image: imageUrl,
    order: order,
    external_url: cleanUrl(imageUrl),
    attributes: [
      {
        trait_type: "pass_type",
        value: formValues.passType,
      },
      {
        trait_type: "member",
        value: formValues.member,
      },
      {
        trait_type: "artist",
        value: formValues.artist,
      },
    ],
  }
  // upload the image and metadata to IPFS
  const metadataClient = new MetaDataClient(NFT_STORAGE_TOKEN)
  const metaCID = await metadataClient.uploadMeta(metadata)

  await axios.post("/api/nfts/create", {
    name: name,
    image_url: imageUrl,
    ipfs_token: metaCID,
    pass_id: passId,
    order: order,
    metadata: metadata,
    is_minted: premint,
  })

  metadatas.push(metadata)
}

export const setFolderStorage = async (
  contractAddress: string,
  folderCid: string
) => {
  const res = await fetch("/api/contracts/setFolderStorage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contractAddress,
      network: "goerli",
      folderIPFSUrl: "ipfs://" + folderCid + "/",
    }),
  })

  if (!res.ok) throw new Error("Set Folder Storage failed" + (await res.json()))

  const { transactionHash } = await res.json()

  console.log("Set Folder Storage Transaction Hash: " + transactionHash)
}

export const bulkMint = async (contractAddress: string, size: string) => {
  const res = await fetch("/api/contracts/bulkMint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contractAddress,
      network: "goerli",
      count: size,
    }),
  })

  if (!res.ok)
    throw new Error("Admin Bulk Mint failed" + (await res.json()).toString())

  const { transactionHash } = await res.json()

  console.log("Admin Bulk Mint Transaction Hash: " + transactionHash)
}

export const deployContract = async (formValues: any) => {
  const payload = {
    network: "goerli",
    ...formValues,
  }
  console.log("Init Contract Deployment")
  const res = await fetch("/api/contracts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const { err } = await res.json()
    alert("Error: " + err)
  }

  const { requestId } = await res.json()
  return requestId
}

export function b64toBlob(dataURI: any) {
  const byteString = atob(dataURI.split(",")[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/jpeg" })
}
