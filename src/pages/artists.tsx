import Head from "next/head"

import ArtistListing from "@/components/ArtistListing"
const Artists = () => {
  return (
    <>
      <Head>
        <title>Artists - PlusOne</title>
      </Head>
      <ArtistListing />
    </>
  )
}

Artists.requireAuth = false

export default Artists
