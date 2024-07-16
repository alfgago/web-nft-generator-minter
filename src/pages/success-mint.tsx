import React from "react";
import Head from "next/head";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import axios from "axios";

const Index = ({ }) => {
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
    /**
     * Mints the NFT using the API.
     *
     * @return {Promise<void>} A promise that resolves when the NFT is minted.
     */
    const mintNft = async (): Promise<void> => {
      try {
        // Send a POST request to the API to mint the NFT
        const response = await axios.post<{ data: string }>(
          "/api/mint",
          {
            transactionId, // The transaction ID of the minting transaction
            metadataCid, // The CID of the metadata for the NFT
            nftId, // The ID of the NFT
          }
        )

        // Log the response data from the API
        console.log(response.data)

        // TODO: Implement the code for setting the token URI for the minted NFT

      } catch (error) {
        // Log any errors that occur during the minting process
        console.error(error)
      }
    }

    useEffect(() => {
      mintNft()
    }, [])

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
}
/**
 * Fetches the server-side props for the SuccessMint component.
 * Sets the token URI for the minted NFT and returns the response data as props.
 *
 * @param {Object} context - The context object containing the query object.
 * @param {Object} context.query - The query object containing the transactionId, metadataCid, and nftId.
 * @returns {Object} The response data as props.
 */
export async function getServerSideProps({ query }: { query: { [key: string]: string } }) {
  // Extract query parameters: transactionId, metadataCid, and nftId
  const transactionId = query.transactionId;
  const metadataCid = query.metadataCid;
  const nftId = query.nftId;

  // Initialize thirdweb SDK
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const sdk = new ThirdwebSDK(provider);

  // Get transaction details using thirdweb SDK
  // Send a GET request to the thirdweb API to get the transaction details
  const transaction = await sdk.getTransaction(transactionId);
  const claimedTokens = transaction.result.claimedTokens;
  const tokenId = parseInt(claimedTokens[0].tokenId);
  const collectionAddress = claimedTokens[0].collectionAddress;

  // Set the token URI
  // Send a POST request to the server's API to set the token URI
  const tokenUriParams = {
    contractAddress: collectionAddress,
    network: process.env.NEXT_PUBLIC_NETWORK ?? "polygon",
    tokenId,
    metadataCid: "ipfs://" + metadataCid,
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/nfts/token-uri`,
    tokenUriParams
  );

  // Logging the response from setting the token URI
  console.log("Set token uri response:", res.data);

  // Returning the response data as props to the React component for server-side rendering
  return {
    props: {
      data: {
        transactionHash: res.data,
      },
    },
  };
}
