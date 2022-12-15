import { CreateContractParams, Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

import "dotenv/config"

export const deployContract = async (
  contractParams: CreateContractParams,
  network: Network
): Promise<string> => {
  const jc = await createJuiceClientForAutomation(network)

  console.log("ABOUT TO REQUEST CONTRACT CREATION")
  const requestId = await jc.utils.contracts.create(contractParams)
  console.log("REQUESTED CONTRACT CREATION", requestId)

  return requestId
}
