import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"
const network = process.env.NEXT_PUBLIC_NETWORK ?? "goerli"

const sdk = new ThirdwebSDK(network)

const folderAirdrops = async ({
  contractAddress,
  metadatas,
  participantWallets,
  passId,
}: any) => {
  try {
    const contract = await sdk.getContract(contractAddress)
    const folderCid = await contract.storage.upload(metadatas)
    await contract.call("setFolderStorage", folderCid)
    await contract.call("bulkMint", participantWallets.length, true)
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
    await airdrop(contractAddress, wallet, loop)
    loop++
  }
}

const airdrop = async (contractAddress: any, wallet: string, nftId: number) => {
  console.log(`Airdropping ${contractAddress} #${nftId} to ${wallet}`)
  const contract = await sdk.getContract(contractAddress)
  const transaction = await contract.call("transfer", wallet, nftId)

  if (!transaction.receipt.status)
    throw new Error("Airdrop failed: " + JSON.stringify(transaction.receipt))

  console.log("Airdrop transaction hash: ", transaction.receipt.transactionHash)
  return transaction.receipt.transactionHash
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
