import { useState } from "react"
import { ethers } from "ethers"

import { useRequestStatus } from "@/components/NftBuilder/Hooks/useRequestStatus"
import { airdropNFT } from "@/utils/SmartContracts/airdropNFT"
import { uploadNFTMeta } from "@/utils/SmartContracts/assetUpload"
import { createLocalJuiceClient } from "@/utils/SmartContracts/createJuiceClient"
import imageDataUri from "@/utils/SmartContracts/exampleDataUri"
import { userDynamicMint } from "@/utils/SmartContracts/mint"
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

  const uploadAssetAndDevMint = async () => {
    const metadataCid = await uploadAsset()
    const res = await fetch("/api/mints", {
      method: "POST",
      body: JSON.stringify({
        metadataCid,
        contractAddress: requestData.contractAddress,
        network: "goerli",
      }),
    })

    if (!res.ok) throw new Error("Dev mint failed" + (await res.json()))

    const { transactionHash } = await res.json()

    alert("Mint Transaction Hash: " + transactionHash)
  }

  const uploadAssetAndDynamicMint = async () => {
    const metadataCid = await uploadAsset()

    if (!signer) throw new Error("Connect metamask before attempting to mint")

    const txHash = await userDynamicMint({
      network: "goerli",
      metadataCid,
      contractAddress: requestData.contractAddress,
      signer,
    })

    alert("Mint Transaction Hash: " + txHash)
  }

  const airdrop = async () => {
    const txHash = await airdropNFT({
      contractAddress: requestData.contractAddress,
      network: "goerli",
      toWalletAddress: connectedAddress,
      nftId: 1,
    })

    alert("Airdrop Transaction Hash: " + txHash)
  }

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

      <h2>Example NFT Asset</h2>
      <img
        style={{ width: 100, height: "auto" }}
        src={imageDataUri}
        alt="example nft asset"
      />

      <h2>Dev Mint Section</h2>
      <button onClick={uploadAssetAndDevMint}>Dev Mint NFT</button>
      <span>
        Triggers a server side mint of the nft with the custodial admin wallet
      </span>

      <h2>On Demand Mint Section</h2>
      <button onClick={uploadAssetAndDynamicMint}>On Demand Mint</button>
      <span>Triggers a mint from the webpage with dynamic metadata</span>

      <h2>Airdrop Section</h2>
      <button onClick={airdrop}>Airdrop NFT</button>
      <span>Sends the NFT held by the admin wallet to a specific user</span>
    </div>
  )
}

// helpers

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

const uploadAsset = async () => {
  const metadataWithDataURI = {
    name: "Example NFT",
    image: imageDataUri,
    description: "This is an example NFT",
    external_url: "https://plusone.com",
    attributes: [
      {
        trait_type: "Background",
        value: "Blue",
      },
    ],
  }

  // upload the image and metadata to IPFS
  const metadataCid = await uploadNFTMeta(metadataWithDataURI)

  return metadataCid
}

export default JuiceExamples
