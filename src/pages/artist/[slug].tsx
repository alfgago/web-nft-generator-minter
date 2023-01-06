import { useEffect, useState } from "react"
import Head from "next/head"
import axios, { AxiosResponse } from "axios"

import Artist from "@/components/Artist"
import ArtistHero from "@/components/ArtistHero"

const ArtistPage = ({ artist }: any) => {
  console.log(artist)
  const title = artist.attributes.name
  const bio = artist.attributes.bio
  const genre = false
  const artistName = false
  const image = artist.attributes.banner.data.attributes

  const ogTitle = title + " - PlusOne"
  const artistData = artist

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

      <Artist artistData={artistData} />
    </>
  )
}

export const getServerSideProps = async ({ query }: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await axios.get(
    `${apiURL}/api/artists?filters[slug][$eq]=${query.slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  // console.log(postResponse.data.data[0])

  const response = await axios.get(
    `https://plusone.stag.host/api/artists/${postResponse.data.data[0].id}?populate=deep,4`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  console.log(response)

  if (postResponse.data) {
    https: return {
      props: {
        artist: response.data.data,
      },
    }
  }
}

export default ArtistPage
