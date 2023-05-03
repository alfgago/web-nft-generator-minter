/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

import { uploadFolder } from "@/utils/mintUtils"

import bulkMint from "../contracts/bulkMint"
import setFolderStorage from "../contracts/setFolderStorage"
const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"

const folderAirdrops = async ({
  contractAddress,
  metadatas,
  participantWallets,
  passId,
}: any) => {
  try {
    console.log("metadatas2", metadatas)
    const folderCid = await uploadFolder(contractAddress, metadatas)
    await setFolderStorage(contractAddress, folderCid)
    await bulkMint(contractAddress, participantWallets.length)
    await axios.post(baseUrl + "/api/passes/update-folder", {
      id: passId,
      folderCid: folderCid,
    })
  } catch (error) {
    console.log(error)
  }

  let loop = 1
  for (const wallet of participantWallets) {
    // Airdrops each NFT to each corresponding wallet.
    airdrop(contractAddress, wallet, loop)
    loop++
  }
}

const airdrop = async (contractAddress: any, wallet: string, nftId: number) => {
  const res = await fetch(baseUrl + "/api/airdrops", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contractAddress,
      network: "goerli",
      toWalletAddress: wallet,
      nftId: nftId,
    }),
  })
  console.log(res)

  if (!res.ok)
    throw new Error("Airdrop failed" + JSON.stringify(await res.json()))

  const { transactionHash } = await res.json()

  return transactionHash
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await folderAirdrops(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    console.log(e)
    res.status(400).send({ e: e, err: e.message })
  }
}
