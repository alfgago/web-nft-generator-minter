import React from "react";
import Head from "next/head";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import axios from "axios";

<<<<<<< HEAD
const Index = ({ data }) => {
  console.log(data);
=======
interface SuccessMintProps {
  data: {
    transactionId: string
    metadataCid: string
    nftId: string
  }
}

/**
 * Renders the success page after minting an NFT.
 *
 * @param {SuccessMintProps} props - The props containing the transactionId,
 * metadataCid, and nftId of the minted NFT.
 * @returns {JSX.Element} The success page.
 */
const Index: React.FC<SuccessMintProps> = ({
  data: { transactionId, metadataCid, nftId },
}: SuccessMintProps): JSX.Element => {
  const mintNft = async (): Promise<void> => {
    try {
      const response = await axios.post<{ data: string }>("/api/mint", {
        transactionId,
        metadataCid,
        nftId,
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    mintNft()
  }, [])

>>>>>>> cbcd7f3 (fixed modules for thirdweb)
  return (
    <>
      <Head>
        <title>Mint Successful</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Minting NFT...</h1>
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
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/nfts/set-token-uri`,
    {
      contractAddress: collectionAddress,
      network: process.env.NEXT_PUBLIC_NETWORK ?? "polygon",
      tokenId,
      metadataCid,
      nftId,
    }
  );

  // Returning the response data as props to the React component for server-side rendering
  return {
    props: {
      data: res.data,
    },
  };
}
