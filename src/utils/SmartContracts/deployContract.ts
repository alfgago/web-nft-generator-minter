import { CreateContractParams, Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

export const deployContract = async (
  contractParams: CreateContractParams,
  network: Network
): Promise<string> => {
  const jc = createJuiceClientForAutomation(network)

  const requestId = await jc.utils.contracts.create(contractParams)

  return requestId
}
