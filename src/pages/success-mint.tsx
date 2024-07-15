import React from "react"
import Head from "next/head"
import axios from "axios"

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

  return (
    <>
      <Head>
        <title>Mint Successful</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Minting NFT...</h1>
    </>
  )
}

export default Index

export async function getServerSideProps({ query }: any) {
  // Extract query parameters: transactionId, metadataCid, and nftId
  const transactionId = query.transactionId
  const metadataCid = query.metadataCid
  const nftId = query.nftId

  // Logging the received query parameters for debugging
  console.log("Got transactionId:", transactionId)
  console.log("Got metadataCid:", metadataCid)
  console.log("Got nftId:", nftId)

  // Fetching transaction status from an external API using the transactionId
  const { data } = await axios.get(
    `https://withpaper.com/api/v1/transaction-status/${transactionId}`
  )
  // Logging the received transaction data
  console.log("Got transaction data:", data)

  // Extracting necessary data from the transaction response
  const { claimedTokens, status } = data.result
  if (status !== "success") {
    // TODO: Handle transaction failure
    throw new Error("Transaction failed")
  }
  const [token] = claimedTokens.tokens
  const { tokenId, collectionAddress } = token

  // Logging the extracted tokenId and collectionAddress for debugging
  console.log("Got tokenId:", tokenId)
  console.log("Got collectionAddress:", collectionAddress)

  // Sending a POST request to set the token URI with the collected data
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/nfts/set-token-uri`,
    {
      contractAddress: collectionAddress,
      network: process.env.NEXT_PUBLIC_NETWORK ?? "polygon",
      tokenId,
      metadataCid,
      nftId,
    }
  )
  // Logging the response from setting the token URI
  console.log("Set token uri response:", res.data)

  // Returning the response data as props to the React component for server-side rendering
  return {
    props: {
      data: res.data,
    },
  }
}
