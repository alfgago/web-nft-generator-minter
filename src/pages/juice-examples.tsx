import { useState } from "react"
import { ethers } from "ethers"

import { useRequestStatus } from "@/components/NftBuilder/Hooks/useRequestStatus"
import { uploadNFTMeta } from "@/utils/SmartContracts/assetUpload"
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
      throw Error(err)
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
    const res = await fetch("/api/airdrops", {
      method: "POST",
      body: JSON.stringify({
        contractAddress: requestData.contractAddress,
        network: "goerli",
        toWalletAddress: connectedAddress,
        nftId: 1,
      }),
    })

    if (!res.ok) throw new Error("Airdrop failed" + (await res.json()))

    const { transactionHash } = await res.json()

    alert("Airdrop Transaction Hash: " + transactionHash)
  }

  return (
    <div style={{ padding: 100, display: "flex", flexDirection: "column" }}>
      <h1>Juice Examples</h1>

      <h4 style={h4Styles}>Contract Deploy Section</h4>
      <button style={buttonStyles} onClick={connectMetamask}>
        Connect Wallet
      </button>
      <span>Connected Address: {connectedAddress}</span>

      <button style={buttonStyles} onClick={deployContract}>
        Deploy Contract
      </button>
      <span>Deploys a new smart contract via the vault API</span>
      {contractDeployStatus === "pending" && <span>pending</span>}
      {contractDeployStatus === "succeeded" && (
        <span>success: {requestData.contractAddress}</span>
      )}
      {contractDeployStatus === "failed" && (
        <span>failed: {requestData.error}</span>
      )}

      <h4 style={h4Styles}>Example NFT Asset</h4>
      <img
        style={{ width: 300, height: "auto" }}
        src={imageDataUri}
        alt="example nft asset"
      />

      <h4 style={h4Styles}>Dev Mint Section</h4>
      <button style={buttonStyles} onClick={uploadAssetAndDevMint}>
        Dev Mint NFT
      </button>
      <span>
        Triggers a server side mint of the nft with the custodial admin wallet
      </span>

      <h4 style={h4Styles}>On Demand Mint Section</h4>
      <button style={buttonStyles} onClick={uploadAssetAndDynamicMint}>
        On Demand Mint
      </button>
      <span>Triggers a mint from the webpage with dynamic metadata</span>

      <h4 style={h4Styles}>Airdrop Section</h4>
      <button style={buttonStyles} onClick={airdrop}>
        Airdrop NFT
      </button>
      <span>Sends the NFT held by the admin wallet to a specific user</span>
    </div>
  )
}

const buttonStyles = {
  padding: "20px 10px",
  background: "black",
  color: "white",
  maxWidth: 200,
  margin: "10px 0",
}

const h4Styles = {
  marginTop: 50,
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
