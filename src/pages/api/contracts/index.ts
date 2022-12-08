import { NextApiRequest, NextApiResponse } from "next"

import { deployContract } from "@/utils/SmartContracts/deployContract"
import { CreateContractParams, Network } from "@juicelabs/vault"

// types should probably be consolidated somewhere
// will leave that up to the team to decide
type CreateContractRequestBody = {
  network: Network
  /* TODO - @zac fill in the form data shape */
}

interface CreateContractRequest extends NextApiRequest {
  body: CreateContractRequestBody
}

type ErrResponseBody = {
  err: string
}

type CreateContractResponseBody =
  | {
      requestId: string
    }
  | ErrResponseBody

// TODO - @zac actually perform transformation
const transformCreateContractParams = (
  body: CreateContractRequestBody
): CreateContractParams => {
  return {
    contract: {
      asciiArt: "Test transfer visibility",
      contractName: "TransferVisibilityWorking",
    },
    metadata: {
      name: "Sick Contract #1",
      symbol: "SICK",
      maxSupply: 1000,
      royaltyBips: 100,
    },
    paymentSplits: [
      {
        splitAddress: "0xB9b393363B7394f8766ca5B3c91e020471e830A0",
        splitBips: 9000,
      },
      {
        splitAddress: "0x5e7610698ba465973C11A607eAf43b7f1733D947",
        splitBips: 1000,
      },
    ],
    lazyMintSettings: {
      maxMintableAtCurrentState: 100,
      maxMintsPerWallet: 2,
      maxMintsPerTxn: 2,
      mintPrice: "0.001",
    },
    ownerAddress: "0x5e7610698ba465973C11A607eAf43b7f1733D947",
    operatorAddress: "0xB9b393363B7394f8766ca5B3c91e020471e830A0",
  }
}

export default async function handler(
  req: CreateContractRequest,
  res: NextApiResponse<CreateContractResponseBody>
) {
  try {
    const { network } = req.body
    const createParams = transformCreateContractParams(req.body)
    const requestId = await deployContract(createParams, network)
    res.status(200).json({ requestId })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
