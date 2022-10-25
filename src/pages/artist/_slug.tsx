import Head from "next/head"
import axios from "axios"

import Artist from "@/components/Artist"
import ArtistHero from "@/components/ArtistHero"

const ArtistPage = (props: any) => {
  const title = "Kings of Leon"
  const artistName = "Caleb Followill"
  const bio =
    "Kings of Leon is an American rock band that formed in Nashville, Tennessee, in 1999. The band is composed of brothers Caleb, Nathan and Jared Followill with their cousin Matthew Followill."
  const genre = "Nashville Rock"
  const image = "/assets/img/artist-pic.png"

  console.log(props)

  return (
    <>
      <Head>
        <title>{title} - PlusOne</title>
      </Head>
      <ArtistHero
        title={title}
        artistName={artistName}
        bio={bio}
        image={image}
        genre={genre}
      />
      <Artist />
    </>
  )
}

export const getServerSideProps = async ({ query }: any) => {
  console.log(query.slug)
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await axios.get(`${apiURL}/api/artist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: {
      data: postResponse,
    },
  }
}

export default ArtistPage
