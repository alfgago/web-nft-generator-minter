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
  size: number
  premint: boolean
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
      asciiArt: `\n
    ____  __           ____                __  ___           _         _   ______________     \n
   / __ \/ /_  _______/ __ \____  ___     /  |/  /_  _______(_)____   / | / / ____/_  __/____ \n
  / /_/ / / / / / ___/ / / / __ \/ _ \   / /|_/ / / / / ___/ / ___/  /  |/ / /_    / / / ___/ \n
 / ____/ / /_/ (__  ) /_/ / / / /  __/  / /  / / /_/ (__  ) / /__   / /|  / __/   / / (__  )  \n
/_/   /_/\__,_/____/\____/_/ /_/\___/  /_/  /_/\__,_/____/_/\___/  /_/ |_/_/     /_/ /____/   \n 
`,
      contractName: toPascalCase("P1" + body.name),
    },
    metadata: {
      name: body.name ?? "PlusOne Sample NFT",
      symbol: "P1",
      maxSupply: body.size ?? 500,
      royaltyBips: 10000,
    },
    paymentSplits: [
      {
        splitAddress:
          body.wallet ?? "0x8075105DD20Aa65D05DdeD1C8651aB55f76861c7", // Artist wallet
        splitBips: 5000,
      },
      {
        splitAddress:
          process.env.CUSTODIAL_WALLET_ADDRESS ??
          "0x8075105DD20Aa65D05DdeD1C8651aB55f76861c7", // Admin wallet
        splitBips: 5000,
      },
    ],
    lazyMintSettings: {
      maxMintableAtCurrentState: body.size ?? 50,
      maxMintsPerWallet: body.premint ? body.size : 50,
      maxMintsPerTxn: body.premint ? body.size : 2,
      mintPrice: body.premint ? "0" : `${body.price ?? 0}`, // if premint, price is free for custodial
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
    console.log(createParams)
    const requestId = await deployContract(createParams, network)
    res.status(200).json({ requestId: requestId })
  } catch (e) {
    const msg = e instanceof Error ? e.message : e
    res.status(400).send({ err: "Bad Request:" + msg })
  }
}

function toPascalCase(string: string) {
  return `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase())
}
