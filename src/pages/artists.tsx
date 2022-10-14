import Head from "next/head"

import ArtistListing from "@/components/ArtistListing"

const Artists = ({ data }: any) => {
  console.log(data)
  return (
    <>
      <Head>
        <title>Artists - PlusOne</title>
      </Head>
      <ArtistListing />
    </>
  )
}

export default Artists
