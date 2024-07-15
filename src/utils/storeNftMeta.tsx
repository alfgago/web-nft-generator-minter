import axios from "axios";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFTStorage } from "nft.storage";
import cleanUrl from "@/utils/cleanUrl";

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? "";
const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN });
const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000";
const network = process.env.NEXT_PUBLIC_NETWORK ?? "polygon";

const sdk = new ThirdwebSDK(network);

export const storeNftMeta = async (metadata) => {
  try {
    console.log("storeNftMeta");
    console.log(metadata);

    // Store metadata using NFTStorage client
    const metadataCid = await storage.storeBlob(new Blob([JSON.stringify(metadata)], { type: "application/json" }));

    console.log("Uploaded metadata CID:", metadataCid);
    return metadataCid;
  } catch (error) {
    console.error("Error storing NFT metadata:", error);
    throw error;
  }
};
