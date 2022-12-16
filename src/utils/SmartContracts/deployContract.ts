import { CreateContractParams, Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

import "dotenv/config"

export const deployContract = async (
  contractParams: CreateContractParams,
  network: Network
): Promise<string> => {
  const jc = await createJuiceClientForAutomation(network)

  const requestId = await jc.utils.contracts.create(contractParams)

  return requestId
}
