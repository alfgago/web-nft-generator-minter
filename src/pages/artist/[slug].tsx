import Head from "next/head"
import axios from "axios"

import Artist from "@/components/Artist"
import ArtistHero from "@/components/ArtistHero"

const ArtistPage = ({ artist }: any) => {
  const title = artist.attributes.name
  const bio = artist.attributes.bio
  const genre = false
  const artistName = false
  const image = artist.attributes.banner.data.attributes.url

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
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await axios.get(
    `${apiURL}/api/artists?filters\[slug\][$eq]=${query.slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (postResponse.data) {
    return {
      props: {
        artist: postResponse.data.data[0],
      },
    }
  }
}

export default ArtistPage
