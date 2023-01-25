import { NextApiRequest, NextApiResponse } from "next"
import atob from "atob"
import Blob from "cross-blob"
import { NFTStorage } from "nft.storage"
import Strapi from "strapi-sdk-js"

const createPass = async (values: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN
  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

  const blob = b64toBlob(values.image)
  const nftKey = await client.storeBlob(blob)
  const imageUrl = "https://plusonemusic.io/ipfs/" + nftKey

  const strapi = new Strapi({
    url: apiURL,
    prefix: "/api",
    store: {
      key: "strapi_jwt",
      useLocalStorage: false,
      cookieOptions: { path: "/" },
    },
    axiosOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const nft = await strapi.create("nfts", {
    name: values.name,
    contract_number: "NO-KEY-YET",
    image_url: imageUrl,
    ipfs_token: nftKey,
    pass_collection: values.pass_id,
  })
  console.log(nftKey)

  return nft
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createPass(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}

function b64toBlob(dataURI: any) {
  const byteString = atob(dataURI.split(",")[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/jpeg" })
}
