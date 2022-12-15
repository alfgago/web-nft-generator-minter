import { Signer } from "ethers"

import { Network } from "@juicelabs/client"

import {
  createJuiceClientForAutomation,
  createLocalJuiceClient,
} from "./createJuiceClient"

type DevMintParams = {
  network: Network
  contractAddress: string
  metadataCid: string // the
  toAddress: string // the receiver of the NFT
}

// called server side to mint a token via the automation wallet
// this should likely be used for lottery NFTs and auction NFTs
// accepts a dynamic metadata cid
export const devMint = async ({
  network,
  contractAddress,
  metadataCid, // the IPFS CID of the NFT metadata
  toAddress,
}: DevMintParams) => {
  const jc = createJuiceClientForAutomation(network, contractAddress)
  await jc.waitForInit()

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  // mint the NFT to the toAddress
  await jc.baseNFTFacet?.devMintWithTokenURI(toAddress, `ipfs://${metadataCid}`)
}

type UserMintParams = {
  network: Network
  contractAddress: string
  signer: Signer // acquired once wallet is connected
  metadataCid: string
}

export type MintDataForSignature = {
  types: string[]
  values: (string | number)[]
}

// called from the front end to mint a token via the user's wallet
// they will receive a confirmation message in metamask (or other wallet)
// executes the following steps
export const userDynamicMint = async ({
  network,
  contractAddress,
  signer,
  metadataCid,
}: UserMintParams) => {
  const jc = createLocalJuiceClient(network, contractAddress, signer)
  await jc.waitForInit()

  if (!jc.onDemandFacet) throw new Error("On Demand Minting contract not found")

  const minterAddress = await signer.getAddress()

  // signatures can only be used once,
  // so we need the current nonce for the minter
  const nonce = (
    await jc.onDemandFacet.mintNonceForAddress(minterAddress)
  ).toNumber()

  const tokenUri = `ipfs://${metadataCid}`

  const dataToSign: MintDataForSignature = {
    types: ["address", "address", "uint256", "string"],
    values: [minterAddress, contractAddress, nonce, tokenUri],
  }

  // call to plus one api to sign the data (via Juice Vault)
  const res = await fetch("/api/signatures", {
    method: "POST",
    body: JSON.stringify({ mintData: dataToSign, network, contractAddress }),
  })

  const { signature } = await res.json()

  // actually mint the NFT with the tokenUri and signature
  await jc.onDemandFacet.onDemandMint(tokenUri, signature)
}

export const signMintData = async (
  network: Network,
  contractAddress: string,
  mintData: MintDataForSignature
) => {
  const jc = createJuiceClientForAutomation(network, contractAddress)
  await jc.waitForInit()

  const signature = await jc.utils.signatures.createEncoded(mintData)

  return signature
}
