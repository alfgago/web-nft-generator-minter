import { Signer } from "ethers"

import { Network } from "@juicelabs/client"

import {
  createJuiceClientForAutomation,
  createLocalJuiceClient,
} from "./createJuiceClient"

export type DevMintParams = {
  network: Network
  contractAddress: string
  metadataCid: string // the ipfs cid of the NFT metadata
  toAddress: string // the receiver of the NFT
}

// called server side to mint a token via the automation wallet
// this should likely be used for lottery NFTs and auction NFTs
// accepts a dynamic metadata cid. This method is only accessible
// to the contract owner and operators
export const devMint = async ({
  network,
  contractAddress,
  metadataCid, // the IPFS CID of the NFT metadata
  toAddress,
}: DevMintParams) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  // mint the NFT to the toAddress
  const tx = await jc.baseNFTFacet?.devMintWithTokenURI(
    toAddress,
    `ipfs://${metadataCid}`
  )

  await tx.wait()

  return tx.hash
}

export type UserMintParams = {
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
// requires a server side signature to be passed to the contract to prevent
// users from minting with arbitrary metadata
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
  // essentially "approving" the minting of the NFT metadata
  const res = await fetch("/api/signatures", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mintData: dataToSign, network, contractAddress }),
  })

  if (!res.ok)
    throw new Error(
      "Failed to sign mint data" + JSON.stringify(await res.json())
    )

  const { signature } = await res.json()
  const mintPrice = (await jc.lazyMintFacet?.publicMintPrice()) || 0

  // actually mint the NFT with the tokenUri and signature
  const tx = await jc.onDemandFacet.onDemandMint(tokenUri, signature, {
    gasLimit: 400000,
    value: mintPrice,
  })
  await tx.wait()

  return tx.hash
}

// called by plus one API, signs the mint data to approve it for minting
export const signMintData = async (
  network: Network,
  contractAddress: string,
  mintData: MintDataForSignature
) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  const signature = await jc.utils.signatures.createEncoded(mintData)

  return signature
}

export type BulkMintParams = {
  network: Network
  contractAddress: string
  toAddress: string
  count: number
}

export const bulkMint = async ({
  network,
  contractAddress,
  count,
  toAddress,
}: BulkMintParams) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  const tx = await jc.baseNFTFacet?.devMint(toAddress, count)
  await tx.wait()

  return tx.hash
}
