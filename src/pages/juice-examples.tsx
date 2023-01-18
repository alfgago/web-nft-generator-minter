// @ts-nocheck
import { useEffect, useState } from "react"
import { ethers } from "ethers"

import { useRequestStatus } from "@/components/NftBuilder/Hooks/useRequestStatus"
import { uploadNFTMeta } from "@/utils/SmartContracts/assetUpload"
import imageDataUri from "@/utils/SmartContracts/exampleDataUri"
import { userDynamicMint } from "@/utils/SmartContracts/mint"
import { JsonRpcSigner } from "@ethersproject/providers"

const JuiceExamples = () => {
  const [signer, setSigner] = useState<null | JsonRpcSigner>(null)
  const [connectedAddress, setConnectedAddress] = useState("none")
  const [contractAddress, setContractAddress] = useState(
    "0xD21Cd864C4B73660526526581631Ae3aD7230f0D"
  )

  const {
    requestStatus: contractDeployStatus,
    requestData,
    setRequestId,
  } = useRequestStatus()

  useEffect(() => {
    if (requestData?.contractAddress) {
      setContractAddress(requestData.contractAddress)
    }
  }, [requestData])

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ network: "goerli" }), // see back end mock
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadataCid,
        contractAddress,
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
      contractAddress,
      signer,
    })

    alert("Mint Transaction Hash: " + txHash)
  }

  const airdrop = async () => {
    const res = await fetch("/api/airdrops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network: "goerli",
        toWalletAddress: connectedAddress,
        nftId: 1,
      }),
    })

    if (!res.ok)
      throw new Error("Airdrop failed" + JSON.stringify(await res.json()))

    const { transactionHash } = await res.json()

    alert("Airdrop Transaction Hash: " + transactionHash)
  }

  const setSaleState = async () => {
    const res = await fetch("/api/contracts/setSaleState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network: "goerli",
        saleState: 6, // the state that opens the sale
      }),
    })

    if (!res.ok) throw new Error("Set Sale State failed" + (await res.json()))

    const { transactionHash } = await res.json()

    alert("Set Sale State Transaction Hash: " + transactionHash)
  }

  const setFolderStorage = async () => {
    const res = await fetch("/api/contracts/setFolderStorage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network: "goerli",
        folderIPFSUrl: "",
      }),
    })

    if (!res.ok)
      throw new Error("Set Folder Storage failed" + (await res.json()))

    const { transactionHash } = await res.json()

    alert("Set Folder Storage Transaction Hash: " + transactionHash)
  }

  const adminBulkMint = async () => {
    const res = await fetch("/api/contracts/bulkMint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network: "goerli",
        count: 10,
        toAddress: connectedAddress,
      }),
    })

    if (!res.ok)
      throw new Error("Set Folder Storage failed" + (await res.json()))

    const { transactionHash } = await res.json()

    alert("Admin Bulk Mint Transaction Hash: " + transactionHash)
  }

  return (
    <div style={{ padding: 100, display: "flex", flexDirection: "column" }}>
      <h1>Juice Examples</h1>

      <h4 style={h4Styles}>Contract Deploy Section</h4>
      <button style={buttonStyles} onClick={deployContract}>
        Deploy Contract
      </button>
      <span>Deploys a new smart contract via the vault API</span>
      {contractDeployStatus === "pending" && <span>pending</span>}
      {contractDeployStatus === "succeeded" && (
        <span>success, deployed contract to: {contractAddress}</span>
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
      <button style={buttonStyles} onClick={setSaleState}>
        Open The NFT Sale
      </button>
      <span>
        the sale is initially closed, so the admin must first open it for the
        sale to go live
      </span>
      <button style={buttonStyles} onClick={connectMetamask}>
        Connect Wallet
      </button>
      <span>Connected Address: {connectedAddress}</span>
      <button style={buttonStyles} onClick={uploadAssetAndDynamicMint}>
        On Demand Mint
      </button>

      <span>Triggers a mint from the webpage with dynamic metadata</span>

      <h4 style={h4Styles}>Airdrop Section</h4>
      <button style={buttonStyles} onClick={airdrop}>
        Airdrop NFT
      </button>
      <span>Sends the NFT held by the admin wallet to a specific user</span>

      <hr />

      <h4 style={h4Styles}>Set Folder Storage</h4>
      <button style={buttonStyles} onClick={setFolderStorage}>
        Set Folder Storage
      </button>
      <span>
        Set the IPFS folder storage for all NFTs metadata for the contract (you
        will need to upload them ahead of time)
      </span>

      <h4 style={h4Styles}>Admin Bulk Mint</h4>
      <button style={buttonStyles} onClick={adminBulkMint}>
        Bulk Mint NFTs (10)
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
