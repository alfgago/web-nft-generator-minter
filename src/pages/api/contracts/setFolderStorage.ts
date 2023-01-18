import { NextApiRequest, NextApiResponse } from "next"

import {
  SetFolderStorageParams,
  setMetadataFolderStorage,
} from "@/utils/SmartContracts/setFolderStorage"

import "dotenv/config"

type SetFolderStorageRequestBody = SetFolderStorageParams

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

    const transactionHash = await setMetadataFolderStorage({
      contractAddress,
      network,
      folderIPFSUrl,
    })

    res.status(200).json({ transactionHash })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
