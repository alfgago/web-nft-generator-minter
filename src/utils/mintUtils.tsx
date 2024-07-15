import axios from "axios"
import { ethers } from "ethers"
import { NFTStorage } from "nft.storage"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

import cleanUrl from "@/utils/cleanUrl"
import { storeNftMeta } from "./storeNftMeta"

export const uploadFolder = async (contractAddress, metadatas) => {
  console.log("uploadFolder");
  console.log(metadatas);

  const sdk = new ThirdwebSDK(process.env.NEXT_PUBLIC_NETWORK ?? "goerli");

  export const uploadFolder = async (contractAddress: string, metadatas: any) => {
    console.log("uploadFolder")
    console.log(metadatas)
    const { data } = await axios.post(baseUrl + "/api/nfts/create-folder", {
      folderName: contractAddress,
      metadatas: JSON.stringify(metadatas),
    });

    console.log("uploadedFolder: " + data.cid);
    return data.cid;
  };

  export const uploadNft = async (
    image,
    passId,
    index,
    metadatas,
    formValues,
    nftTitle,
    winner = ""
  ) => {
    const order = index + 1;
    const name = `${formValues.name} ${order}`;
    const desc = `PlusOne NFT for ${nftTitle}`;
    let premint = formValues.saleType === "Auction";
    if (formValues.is_airdropped) {
      premint = true;
    }

    let imageUrl = image;
    if (!imageUrl.startsWith("ipfs://")) {
      const blob = b64toBlob(image);
      const file = new File([blob], `${order}.jpg`);

      const storageResponse = await storage.store({
        name: name,
        description: desc,
        image: file,
      });
      imageUrl = storageResponse.data.image.href;
    }

    const attributes = [
      { trait_type: "pass_type", value: formValues.passType },
      { trait_type: "member", value: formValues.memberName },
      { trait_type: "artist", value: formValues.artistName },
    ];

    if (formValues.passType === "Guest") {
      attributes.push({ trait_type: "event", value: formValues.show });
    }

    const metadata = {
      name: name,
      description: desc,
      image: imageUrl,
      order: order,
      external_url: cleanUrl(imageUrl),
      attributes: attributes,
    };

    console.log(metadata);
    const metaCID = await storeNftMeta(metadata);
    console.log(metaCID);

    const newNft = await axios.post(`${baseUrl}/api/nfts/create`, {
      name: name,
      image_url: imageUrl,
      ipfs_token: metaCID,
      pass_id: passId,
      order: order,
      metadata: metadata,
      is_minted: premint,
      winner_wallet: winner,
    });

    metadatas.push(metadata);
    return newNft;
  };

  export const setFolderStorage = async (contractAddress, folderCid) => {
    const res = await fetch(`${baseUrl}/api/contracts/setFolderStorage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network,
        folderIPFSUrl: `ipfs://${folderCid}/`,
      }),
    });

    if (!res.ok) {
      throw new Error("Set Folder Storage failed: " + (await res.json()));
    }

    const { transactionHash } = await res.json();
    console.log("Set Folder Storage Transaction Hash: " + transactionHash);
  };

  export const registerReservoirCollection = async (contractAddress) => {
    const { data } = await axios.post("/api/contracts/register-reservoir", {
      contractAddress,
    });
    return data;
  };

  export const bulkMint = async (contractAddress, size, toJuice = false) => {
    const res = await fetch(`${baseUrl}/api/contracts/bulkMint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network,
        count: size,
        toJuice,
      }),
    });

    if (!res.ok) {
      throw new Error("Admin Bulk Mint failed: " + (await res.json()).toString());
    }
    console.log("Init Contract Deployment")

    const contractMetadata = {
      name: formValues.name,
      symbol: formValues.symbol,
      primary_sale_recipient: formValues.primarySaleRecipient,
      description: formValues.description,
      image: formValues.image,
    };

    let contractAddress;
    try {
      const contract = await sdk.deployer.deployNFTCollection(contractMetadata);
      contractAddress = contract.address;
    } catch (err) {
      console.error("Error deploying contract:", err);
      throw new Error("Contract deployment failed");
    }

    return contractAddress;
  }

  export const publishPaperContract = async (
    contractAddress: any,
    passId: number
  ) => {
    // Implement the equivalent functionality for registering in thirdweb, if necessary
    const { data } = await axios.post("/api/mints/register-paper-contract", {
      contractAddress,
      passId,
    });
    console.log(data);
  };

  export function b64toBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }
