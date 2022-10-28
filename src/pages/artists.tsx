import Head from "next/head"

import ArtistListing from "@/components/ArtistListing"
import { useSession, getSession } from "next-auth/react"
const Artists = ({ data }: any) => {
  const { data: session, status } = useSession()
  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

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

Artists.requireAuth = false

export default Artists
