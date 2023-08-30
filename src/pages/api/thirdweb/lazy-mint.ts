import { NextApiRequest, NextApiResponse } from "next"

import { ThirdwebSDK } from "@thirdweb-dev/sdk"

import "dotenv/config"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { network, contractAddress, metadatas } = req.body
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.THIRDWEB_PRIVATE,
      network,
      {
        clientId: process.env.THIRDWEB_CLIENT, // Use client id if using on the client side, get it from dashboard settings
        secretKey: process.env.THIRDWEB_SECRET, // Use secret key if using on the server, get it from dashboard settings
      }
    )

    const contract = await sdk.getContract(contractAddress)

    const transactionHash = await sdk.deployer.deployBuiltInContract(
      "signature-drop",
      {
        // Required parameters
        name: toPascalCase("P1" + name), // Name of the contract
        primary_sale_recipient: process.env.ADMIN_WALLET_ADDRESS, // Wallet address to receive funds from sales
        voting_token_address: process.env.ADMIN_WALLET_ADDRESS, // Only used for Vote

        // Optional metadata
        app_uri: "https://plusonemusic.io", // Website of your contract dApp
        symbol: "P1", // Symbol of the contract tokens

        // Optional Royalty fee information
        fee_recipient: process.env.ADMIN_WALLET_ADDRESS,
        seller_fee_basis_points: 100,

        // Optional split specific parameters
        recipients: paymentSplits,
      }
    )

    res.status(200).json({ transactionHash })
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
