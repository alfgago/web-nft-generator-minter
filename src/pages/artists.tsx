import Head from "next/head"
import { getSession, useSession } from "next-auth/react"

import ArtistListing from "@/components/ArtistListing"
const Artists = ({ data }: any) => {
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
