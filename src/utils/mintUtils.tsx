import axios from "axios"
import { NFTStorage } from "nft.storage"

import cleanUrl from "@/utils/cleanUrl"
import { MetaDataClient } from "@juicelabs/client"

import { storeNftMeta } from "./storeNftMeta"

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""
const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN })
const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"

export const uploadFolder = async (contractAddress: string, metadatas: any) => {
  console.log("uploadFolder")
  console.log(metadatas)
  const { data } = await axios.post(baseUrl + "/api/nfts/create-folder", {
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
  const name = formValues.name + " " + order
  const desc = "PlusOne NFT for " + nftTitle
  const premint = true

  let imageUrl = image
  if (!imageUrl.startsWith("ipfs://")) {
    const blob = b64toBlob(image)
    const file = new File([blob], order + ".jpg")

    const storageResponse = await storage.store({
      name: name,
      description: desc,
      image: file,
    })
    imageUrl = storageResponse.data.image.href
  }

  const atts = [
    {
      trait_type: "pass_type",
      value: formValues.passType,
    },
    {
      trait_type: "member",
      value: formValues.memberName,
    },
    {
      trait_type: "artist",
      value: formValues.artistName,
    },
  ]

  if (formValues.passType == "Guest") {
    atts.push({
      trait_type: "event",
      value: formValues.show,
    })
  }

  const metadata = {
    name: name,
    description: desc,
    image: imageUrl,
    order: order,
    external_url: cleanUrl(imageUrl),
    attributes: atts,
  }
  console.log(metadata)
  const metaCID = await storeNftMeta(metadata)
  console.log(metaCID)

  await axios.post(baseUrl + "/api/nfts/create", {
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
  const res = await fetch(baseUrl + "/api/contracts/setFolderStorage", {
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

export const bulkMint = async (
  contractAddress: string,
  size: string,
  toJuice = false
) => {
  const res = await fetch(baseUrl + "/api/contracts/bulkMint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contractAddress,
      network: "goerli",
      count: size,
      toJuice,
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
  const res = await fetch(baseUrl + "/api/contracts", {
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
