import { Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

import "dotenv/config"

export type TokenUriParams = {
  contractAddress: string // the NFT contract address
  network: Network // either goerli or polygon
  tokenId: number // the token number
  metadataCid: string // the airdrop receiver
}

export const setTokenURI = async ({
  contractAddress,
  network,
  tokenId,
  metadataCid,
}: TokenUriParams) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  const fromAddress = await jc.signer?.getAddress()
  if (!fromAddress) throw new Error("No signer found")

  // transfer the NFT to the wallet address
  const tx = await jc.baseNFTFacet?.setTokenURI(tokenId, metadataCid)

  // wait for the transaction to be mined
  await tx.wait()

  return tx.hash
}
