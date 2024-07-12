import React from "react";
import Head from "next/head";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import axios from "axios";

const Index = ({ data }) => {
  console.log(data);
  return (
    <>
      <Head>
        <title>Mint Successful</title>
        <meta name="robots" content="noindex" />
      </Head>
      Test Callback
    </>
  );
};

export default Index;

export async function getServerSideProps({ query }) {
  const transactionId = query.transactionId;
  const metadataCid = query.metadataCid;
  const nftId = query.nftId;

  // Initialize thirdweb SDK
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const sdk = new ThirdwebSDK(provider);

  // Get transaction details using thirdweb SDK
  const transaction = await sdk.getTransaction(transactionId);
  const claimedTokens = transaction.result.claimedTokens;
  const tokenId = claimedTokens[0].tokenId;
  const collectionAddress = claimedTokens.collectionAddress;

  // Set the token URI
  const res = await axios.post(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/nfts/set-token-uri",
    {
      contractAddress: collectionAddress,
      network: process.env.NEXT_PUBLIC_NETWORK ?? "goerli",
      tokenId,
      metadataCid,
      nftId,
    }
  );

  return {
    props: {
      data: res.data,
    },
  };
}
