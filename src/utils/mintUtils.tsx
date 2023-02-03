import axios from "axios"
import { NFTStorage } from "nft.storage"

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
  const blob = b64toBlob(image)
  const nftKey = await storage.storeBlob(blob)
  const name = formValues.name + " " + (index + 1)
  const imageUrl = "https://plusonemusic.io/ipfs/" + nftKey

  const premint = formValues.saleType == "Auction"
  const metadata = {
    name: name,
    image: "ipfs://" + nftKey,
    description: "PlusOne NFT for " + nftTitle,
    external_url: imageUrl,
    attributes: [
      {
        pass_type: formValues.passType,
        member: formValues.member,
        artist: formValues.artist,
      },
    ],
  }

  await axios.post("/api/nfts/create", {
    name: name,
    image_url: imageUrl,
    ipfs_token: nftKey,
    pass_id: passId,
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
