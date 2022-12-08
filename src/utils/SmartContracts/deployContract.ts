import {
  CreateContractParams,
  JuiceVaultClient,
  Network,
} from "@juicelabs/vault"

export const deployContract = async (
  contractParams: CreateContractParams,
  network: Network
): Promise<string> => {
  // node client for Juice Vault API. Get
  // keys from https://juicelabs.io/vault/keys
  const vault = new JuiceVaultClient({
    privateKey: process.env.JUICE_PRIVATE_KEY || "",
    publicKey: process.env.JUICE_PUBLIC_KEY || "",
    baseUrl: "https://juicelabs.io/api/v1",
    passphrase: process.env.JUICE_WALLET_PASSPHRASE,
    walletAddress: process.env.JUICE_WALLET_ADDRESS,
    network,
  })

  // TODO - @zac improve typed response and
  // error handling from the client lib
  const res = await vault.contracts.create(contractParams)
  const { requestId } = await res.json()

  return requestId
}
