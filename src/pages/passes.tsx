import Head from "next/head"
import axios from "axios"

import PassListing from "@/components/PassListing"

const Nfts = () => {
  return (
    <>
      <Head>
        <title>Pass Collections - PlusOne</title>
      </Head>
      <PassListing />
    </>
  )
}

Nfts.requireAuth = false

export default Nfts
