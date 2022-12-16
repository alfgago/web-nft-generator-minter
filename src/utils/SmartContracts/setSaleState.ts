import { Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

import "dotenv/config"

export type SetSaleStateParams = {
  contractAddress: string // the NFT contract address
  network: Network // either goerli or polygon
  saleState: number // the sale state number 6 = on_demand_mint
}

export const setSaleState = async ({
  contractAddress,
  network,
  saleState,
}: SetSaleStateParams) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  const fromAddress = await jc.signer?.getAddress()
  if (!fromAddress) throw new Error("No signer found")

  // transfer the NFT to the wallet address
  const tx = await jc.baseNFTFacet.setSaleState(saleState)

  // wait for the transaction to be mined
  await tx.wait()

  return tx.hash
}
