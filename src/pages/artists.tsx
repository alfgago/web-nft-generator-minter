import Head from "next/head"
import { getSession, useSession } from "next-auth/react"
import axios from "axios"

import ArtistListing from "@/components/ArtistListing"
const Artists = ({ artists }: any) => {
  return (
    <>
      <Head>
        <title>Artists - PlusOne</title>
      </Head>
      <ArtistListing artists={artists.data} />
    </>
  )
}

Artists.requireAuth = false

export default Artists

export const getServerSideProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const response = await axios.get(`${apiURL}/api/artists?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: {
      artists: response.data,
    },
  }
}
