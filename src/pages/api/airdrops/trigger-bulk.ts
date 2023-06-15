/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"

import { bulkMint, setFolderStorage, uploadFolder } from "@/utils/mintUtils"

const folderAirdrops = async ({
  contractAddress,
  metadatas,
  participantWallets,
  passId,
}: any) => {
  try {
    const folderCid = await uploadFolder(contractAddress, metadatas)
    await setFolderStorage(contractAddress, folderCid)
    await bulkMint(contractAddress, participantWallets.length, true)
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
  console.log(`Airdropping ${contractAddress} #${nftId} to ${wallet}`)
  const res = await fetch(baseUrl + "/api/airdrops", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contractAddress,
      network: process.env.NEXT_PUBLIC_NETWORK ?? "goerli",
      toWalletAddress: wallet,
      nftId: nftId,
    }),
  })

  if (!res.ok)
    throw new Error("Airdrop failed: " + JSON.stringify(await res.json()))

  const { transactionHash } = await res.json()

  console.log("Airdrop transaction hash: ", transactionHash)
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
