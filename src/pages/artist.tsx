import Head from "next/head"
import Hero from "@/components/Hero"
import Artist from "@/components/Artist"
import axios from "axios"

const ArtistPage = ({ data }: any) => {
  return (
    <>
      <Head>
        <title>Artist - PlusOne</title>
      </Head>
      <Hero />
      <Artist />
    </>
  )
}

export default ArtistPage
