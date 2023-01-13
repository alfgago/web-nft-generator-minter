import { NextApiRequest, NextApiResponse } from "next"

import { deployContract } from "@/utils/SmartContracts/deployContract"
import { CreateContractParams, Network } from "@juicelabs/client"

import "dotenv/config"

// types should probably be consolidated somewhere
// will leave that up to the team to decide
type CreateContractRequestBody = {
  network: Network
  name: string
  wallet: string
  price: number
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
// transform the form body from the front end into
// the shape expected by the client lib. Or throw
// if the body is invalid
const transformCreateContractParams = (
  body: CreateContractRequestBody
): CreateContractParams => {
  // this is an example client lib payload
  return {
    contract: {
      asciiArt:
        "super cool ascii art that goes in the source code of the smart contract",
      contractName: "PascalCaseContractTitle",
    },
    metadata: {
      name: body.name ?? "PlusOne Sample NFT",
      symbol: "P1",
      maxSupply: 500,
      royaltyBips: 100,
    },
    paymentSplits: [
      {
        splitAddress:
          body.wallet ?? "0x8075105DD20Aa65D05DdeD1C8651aB55f76861c7",
        splitBips: 100,
      },
    ],
    lazyMintSettings: {
      maxMintableAtCurrentState: 500,
      maxMintsPerWallet: 10,
      maxMintsPerTxn: 2,
      mintPrice: (body.price ?? 0) + "",
    },
    mintSigningAddress: process.env.JUICE_WALLET_ADDRESS || "",
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
    res.status(200).json({ requestId: requestId })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}
