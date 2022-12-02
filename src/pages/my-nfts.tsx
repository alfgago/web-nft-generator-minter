import React from "react"
import Head from "next/head"

import MyNfts from "@/components/MyNfts"

const MyNftsPage = () => {
  return (
    <>
      <Head>
        <title>My Nfts - PlusOne</title>
      </Head>
      <MyNfts />
    </>
  )
}

export default MyNftsPage
