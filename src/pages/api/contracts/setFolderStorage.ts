import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import "dotenv/config"

type SetFolderStorageRequestBody = {
  contractAddress: string
  network: string
  folderIPFSUrl: string
}

interface SetFolderStorageRequest extends NextApiRequest {
  body: SetFolderStorageRequestBody
}

type ErrResponseBody = {
  err: string
}

type SetFolderStorageResponseBody =
  | {
      transactionHash: string
    }
  | ErrResponseBody

export default async function handler(
  req: SetFolderStorageRequest,
  res: NextApiResponse<SetFolderStorageResponseBody>
) {
  try {
    const { contractAddress, network, folderIPFSUrl } = req.body

    const sdk = new ThirdwebSDK(network)
    const contract = await sdk.getContract(contractAddress)

    const transaction = await contract.call("setFolderStorage", folderIPFSUrl)
    const transactionHash = transaction.receipt.transactionHash

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
