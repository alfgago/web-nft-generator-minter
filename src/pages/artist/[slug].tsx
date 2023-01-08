import { useEffect, useState } from "react"
import Head from "next/head"
import axios, { AxiosResponse } from "axios"

import Artist from "@/components/Artist"
import ArtistHero from "@/components/ArtistHero"

const ArtistPage = ({ artist }: any) => {
  const title = artist.attributes.name
  const bio = artist.attributes.bio
  const genre = false
  const artistName = false
  const image = artist.attributes.banner.data.attributes
  const ogTitle = title + " - PlusOne"
  console.log(image)
  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <meta name="description" content={bio} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:image" content={image} />
      </Head>
      <ArtistHero
        title={title}
        artistName={artistName}
        bio={bio}
        image={image}
        genre={genre}
      />

      <Artist artist={artist} />
    </>
  )
}

export const getServerSideProps = async ({ query }: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const response = await axios.get(`${apiURL}/api/artists`, {
    params: {
      populate: "banner,events.passes",
      "filters[slug][$eq]": query.slug,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.data) {
    https: return {
      props: {
        artist: response.data.data[0],
      },
    }
  }
}

export default ArtistPage
