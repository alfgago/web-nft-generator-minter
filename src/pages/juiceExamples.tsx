import { useState } from "react"
import { ethers } from "ethers"

import { useRequestStatus } from "@/components/NftBuilder/Hooks/useRequestStatus"
import { uploadNFTMeta } from "@/utils/SmartContracts/assetUpload"
import { JsonRpcSigner } from "@ethersproject/providers"

const JuiceExamples = () => {
  const [signer, setSigner] = useState<null | JsonRpcSigner>(null)
  const [connectedAddress, setConnectedAddress] = useState("none")
  const {
    requestStatus: contractDeployStatus,
    requestData,
    setRequestId,
  } = useRequestStatus()

  const connectMetamask = async () => {
    const mmProvider = getMMEthereumProvider()
    if (!mmProvider) {
      alert("MetaMask not found")
      return
    }

    const provider = new ethers.providers.Web3Provider(mmProvider, "any")
    await provider.send("eth_requestAccounts", [])

    const signerVal = provider.getSigner()
    const address = await signerVal.getAddress()
    setSigner(signerVal)
    setConnectedAddress(address)
  }

  const deployContract = async () => {
    const res = await fetch("/api/contracts", {
      method: "POST",
      body: JSON.stringify({}), // see back end for params
    })

    if (!res.ok) {
      const { err } = await res.json()
      alert("Error: " + err)
    }

    const { requestId } = await res.json()
    setRequestId(requestId)
  }

  const uploadAssetAndDevMint = async () => {}

  return (
    <div>
      <h1>Juice Examples (TODO)</h1>

      <h2>Contract Deploy Section</h2>
      <button onClick={connectMetamask}>Connect Wallet</button>
      <span>Connected Address: {connectedAddress}</span>

      <button onClick={deployContract}>Deploy Contract</button>
      <span>Deploys a new smart contract via the vault API</span>
      {contractDeployStatus === "pending" && <span>pending</span>}
      {contractDeployStatus === "succeeded" && (
        <span>success: {requestData.contractAddress}</span>
      )}
      {contractDeployStatus === "failed" && (
        <span>failed: {requestData.error}</span>
      )}

      <h2>Dev Mint Section</h2>
      <button>Dev Mint NFT</button>
      <span>
        Triggers a server side mint of the nft with the custodial admin wallet
      </span>

      <h2>On Demand Mint Section</h2>
      <button>On Demand Mint</button>
      <span>Triggers a mint from the webpage with dynamic metadata</span>

      <h2>Airdrop Section</h2>
      <input type="numbr" placeholder="nft id" />
      <input type="text" placeholder="Address to airdrop to" />
      <button>Airdrop NFT</button>
      <span>Sends the NFT held by the admin wallet to a specific user</span>
    </div>
  )
}

const getMMEthereumProvider = () => {
  // @ts-ignore
  if (window.ethereum?.isMetaMask && !window.ethereum?.overrideIsMetaMask) {
    // @ts-ignore
    return window.ethereum
  }

  // @ts-ignore
  if (window.ethereum?.providers?.length > 0) {
    // @ts-ignore
    for (const provider of window.ethereum.providers) {
      if (provider.isMetaMask) {
        return provider
      }
    }
  }

  return null
}

export default JuiceExamples
