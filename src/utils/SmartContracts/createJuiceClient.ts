import { Signer } from "ethers"

import { AutomationWallet, JuiceClient, Network } from "@juicelabs/client"

// called in the back end. Used for automation
// and administrative contract tasks
export const createJuiceClientForAutomation = async (
  network: Network,
  contractAddress?: string
) => {
  // Automation wallet is a special semi-custodial wallet
  // which can sign transactions via the Juice Vault API.
  // This is passed to the Juice Client lib to automate
  // contract tasks such as deploys, mints, and airdrops
  // Get keys from https://juicelabs.io/vault/keys
  const automationWallet = new AutomationWallet({
    privateKey: process.env.JUICE_PRIVATE_KEY || "",
    publicKey: process.env.JUICE_PUBLIC_KEY || "",
    passphrase: process.env.JUICE_WALLET_PASSPHRASE,
    walletAddress: process.env.JUICE_WALLET_ADDRESS,
    network,
    isManaged: true,
  })

  // client lib for interacting with juice contracts
  const juiceClient = new JuiceClient({
    signer: automationWallet,
    network,
    contractAddress,
  })

  await juiceClient.waitForInit()

  return juiceClient
}

// used in the front end for direct user / contract
// interaction, using their browser wallet e.g. metamask
export const createLocalJuiceClient = (
  network: Network,
  contractAddress: string,
  signer: Signer
) => {
  const juiceClient = new JuiceClient({
    network,
    signer,
    contractAddress,
  })

  return juiceClient
}
