import React from "react"
import Head from "next/head"
import axios from "axios"

const Index = ({ data }) => {
  console.log(data)
  return (
    <>
      <Head>
        <title>Mint Successful</title>
        <meta name="robots" content="noindex" />
      </Head>
      Test Callback
    </>
  )
}

export default Index

export async function getServerSideProps({ query }: any) {
  const transactionId = query.transactionId
  const metadataCid = query.metadataCid
  const nftId = query.nftId
  const { data } = await axios.get(
    "https://withpaper.com/api/v1/transaction-status/" + transactionId
  )
  const claimedTokens = data.result.claimedTokens
  const tokenId = claimedTokens.tokens[0].tokenId
  const collectionAddress = claimedTokens.collectionAddress

  const res = await axios.post(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/nfts/set-token-uri",
    {
      contractAddress: collectionAddress,
      network: process.env.NEXT_PUBLIC_NETWORK ?? "goerli",
      tokenId,
      metadataCid,
      nftId,
    }
  )

  return {
    props: {
      data: res.data,
    },
  }
}
