import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import axios from "axios";

import { useRequestStatus } from "@/components/NftBuilder/Hooks/useRequestStatus";
import imageDataUri from "@/utils/SmartContracts/exampleDataUri";
import { uploadNFTMeta } from "@/utils/SmartContracts/assetUpload";
import { JsonRpcSigner } from "@ethersproject/providers";

const JuiceExamples = () => {
  const [signer, setSigner] = useState<null | JsonRpcSigner>(null);
  const [connectedAddress, setConnectedAddress] = useState("none");
  const [contractAddress, setContractAddress] = useState(
    "0xb2777bfe02f85305df83509383fc66cb4e5b2d46"
  );

  const sdk = new ThirdwebSDK("goerli");

  const {
    requestStatus: contractDeployStatus,
    requestData,
    setRequestId,
  } = useRequestStatus();

  useEffect(() => {
    if (requestData?.contractAddress) {
      setContractAddress(requestData.contractAddress);
    }
  }, [requestData]);

  const connectMetamask = async () => {
    const mmProvider = getMMEthereumProvider();
    if (!mmProvider) {
      alert("MetaMask not found");
      return;
    }

    const provider = new ethers.providers.Web3Provider(mmProvider, "any");
    await provider.send("eth_requestAccounts", []);

    const signerVal = provider.getSigner();
    const address = await signerVal.getAddress();
    setSigner(signerVal);
    setConnectedAddress(address);

    sdk.updateSignerOrProvider(signerVal); // Update the thirdweb SDK with the signer
  };

  const deployContract = async () => {
    const contract = await sdk.getMarketplace().deploy({
      name: "Example NFT Contract",
      primary_sale_recipient: connectedAddress,
    });
    setContractAddress(contract.address);
    setRequestId(contract.address);
  };

  const uploadAssetAndDevMint = async () => {
    const metadataCid = await uploadAsset();
    const contract = await sdk.getMarketplace(contractAddress);

    const tx = await contract.mint({
      metadata: {
        name: "Example NFT",
        image: metadataCid,
        description: "This is an example NFT",
      },
      to: connectedAddress,
    });

    alert("Mint Transaction Hash: " + tx.receipt.transactionHash);
  };

  const uploadAssetAndDynamicMint = async () => {
    const metadataCid = await uploadAsset();

    if (!signer) throw new Error("Connect metamask before attempting to mint");

    const contract = await sdk.getMarketplace(contractAddress);

    const tx = await contract.mint({
      metadata: {
        name: "Example NFT",
        image: metadataCid,
        description: "This is an example NFT",
      },
      to: connectedAddress,
    });

    alert("Mint Transaction Hash: " + tx.receipt.transactionHash);
  };

  const airdrop = async () => {
    const contract = await sdk.getMarketplace(contractAddress);

    const tx = await contract.transfer({
      to: connectedAddress,
      tokenId: 1,
      amount: 1,
    });

    alert("Airdrop Transaction Hash: " + tx.receipt.transactionHash);
  };

  const setSaleState = async () => {
    const contract = await sdk.getMarketplace(contractAddress);

    const tx = await contract.setSaleState({
      saleState: 6, // the state that opens the sale
    });

    alert("Set Sale State Transaction Hash: " + tx.receipt.transactionHash);
  };

  const setFolderStorage = async () => {
    const contract = await sdk.getMarketplace(contractAddress);

    const tx = await contract.setMetadata({
      metadataUri:
        "ipfs://bafybeibsx5nqobzhxdzzcl56iwmidpnajke756wjesxuedcq7sald6233u/",
    });

    alert("Set Folder Storage Transaction Hash: " + tx.receipt.transactionHash);
  };

  const adminBulkMint = async () => {
    const contract = await sdk.getMarketplace(contractAddress);

    const tx = await contract.mintBatch({
      metadataList: new Array(3).fill({
        name: "Bulk Mint NFT",
        description: "Bulk Mint NFT Description",
        image: imageDataUri,
      }),
      to: connectedAddress,
    });

    alert("Admin Bulk Mint Transaction Hash: " + tx.receipt.transactionHash);
  };

  return (
    <div style={{ padding: 100, display: "flex", flexDirection: "column" }}>
      <h1>Juice Examples</h1>

      <h4 style={h4Styles}>Contract Deploy Section</h4>
      <button style={buttonStyles} onClick={deployContract}>
        Deploy Contract
      </button>
      <span>Deploys a new smart contract via the thirdweb SDK</span>
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
        Bulk Mint NFTs (3)
      </button>
      <span>
        Sends the NFT held by the admin wallet to the connected wallet
      </span>
    </div>
  );
};

const buttonStyles = {
  padding: "20px 10px",
  background: "black",
  color: "white",
  maxWidth: 200,
  margin: "10px 0",
};

const h4Styles = {
  marginTop: 50,
};

// helpers

const getMMEthereumProvider = () => {
  // @ts-ignore
  if (window.ethereum?.isMetaMask && !window.ethereum?.overrideIsMetaMask) {
    // @ts-ignore
    return window.ethereum;
  }

  // @ts-ignore
  if (window.ethereum?.providers?.length > 0) {
    // @ts-ignore
    for (const provider of window.ethereum.providers) {
      if (provider.isMetaMask) {
        return provider;
      }
    }
  }

  return null;
};

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
  };

  // upload the image and metadata to IPFS
  const metadataCid = await uploadNFTMeta(metadataWithDataURI);

  return metadataCid;
};

const getMetadataSample = (imageUrl: any, order = 1) => {
  const atts = [
    {
      trait_type: "pass_type",
      value: "Circle",
    },
    {
      trait_type: "member",
      value: "Sample Member",
    },
    {
      trait_type: "artist",
      value: "Sample Artist",
    },
  ];

  if (formValues.passType == "Guest") {
    atts.push({
      trait_type: "event",
      value: "Sample Event",
    });
  }

  const metadata = {
    name: "Sample NFT",
    description: "Sample NFT Description",
    image: imageUrl,
    order: order,
    external_url: cleanUrl(imageUrl),
    attributes: atts,
  };

  return metadata;
};

export default JuiceExamples;
