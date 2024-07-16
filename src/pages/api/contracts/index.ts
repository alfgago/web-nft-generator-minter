import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
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

const transformCreateContractParams = (
  body: CreateContractRequestBody
): CreateContractParams => {
  const totalRoyaltyBlips = 10000
  const splitBips =
    process.env.ADMIN_WALLET_ADDRESS != body.wallet
      ? totalRoyaltyBlips / 2
      : totalRoyaltyBlips

  const paymentSplits = [
    {
      splitAddress:
        process.env.ADMIN_WALLET_ADDRESS ??
        "0x8075105DD20Aa65D05DdeD1C8651aB55f76861c7", // Admin wallet
      splitBips: splitBips,
    },
  ]

  if (body.wallet) {
    if (process.env.ADMIN_WALLET_ADDRESS != body.wallet) {
      paymentSplits.push({
        splitAddress: body.wallet, // Artist wallet
        splitBips: splitBips,
      })
    }
  }

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
      name: body.name || "PlusOne Sample NFT",
      symbol: "P1",
      maxSupply: body.size || 500,
      royaltyBips: totalRoyaltyBlips,
    },
    paymentSplits: paymentSplits,
    lazyMintSettings: {
      maxMintableAtCurrentState: 0,
      maxMintsPerWallet: 0,
      maxMintsPerTxn: 0,
      mintPrice: `${body.price || 0}`,
    },
    operatorAddress: process.env.JUICE_WALLET_ADDRESS || "",
    ownerAddress: process.env.ADMIN_WALLET_ADDRESS || "",
    mintSigningAddress: process.env.JUICE_WALLET_ADDRESS || "",
    ccCheckoutEnabled: true,
  }
}

export default async function handler(
  req: CreateContractRequest,
  res: NextApiResponse<CreateContractResponseBody>
) {
  try {
    const { network, name, wallet, price, size, premint } = req.body
    const sdk = new ThirdwebSDK(network)
    const createParams = transformCreateContractParams(req.body)
    const contract = await sdk.deployer.deployNFTCollection({
      name: createParams.metadata.name,
      symbol: createParams.metadata.symbol,
      primary_sale_recipient: createParams.paymentSplits[0].splitAddress,
      max_supply: createParams.metadata.maxSupply,
      price_per_token: createParams.lazyMintSettings.mintPrice,
      seller_fee_basis_points: createParams.metadata.royaltyBips,
      fee_recipient: createParams.paymentSplits[0].splitAddress,
    })
    res.status(200).json({ requestId: contract.address })
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
