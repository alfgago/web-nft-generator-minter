import { Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

import "dotenv/config"

export type AirdropParams = {
  contractAddress: string // the NFT contract address
  network: Network // either goerli or polygon
  nftId: number // the token number
  toWalletAddress: string // the airdrop receiver
}

// This helper should be used with the lottery NFTs.
// NFTs should be initially dev minted to the automation
// wallet address then call this function to automatically
// airdrop them to winning addresses once the lottery is run
export const airdropNFT = async ({
  contractAddress,
  network,
  toWalletAddress,
  nftId,
}: AirdropParams) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  const fromAddress = await jc.signer?.getAddress()
  if (!fromAddress) throw new Error("No signer found")

  // transfer the NFT to the wallet address
  const tx = await jc.baseNFTFacet?.transferFrom(
    fromAddress,
    toWalletAddress,
    nftId
  )

  return tx.hash
}
