import { Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

import "dotenv/config"

export const setFolderStorageBaseURI = async ({
  contractAddress,
  network,
}: any) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  const fromAddress = await jc.signer?.getAddress()
  if (!fromAddress) throw new Error("No signer found")

  const tx = await jc.baseNFTFacet?.setFolderStorageBaseURI("ipfs://")

  await tx.wait()

  return tx.hash
}
