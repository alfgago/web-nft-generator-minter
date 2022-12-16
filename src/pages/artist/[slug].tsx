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
  const image = artist.attributes.banner.data.attributes.url
  const apiURL = process.env.API_URL ?? "https://plusone.stag.host/"
  const [tourData, setTourData] = useState<AxiosResponse | null | void>(null)

  useEffect(() => {
    fetchData()
  }, [0])

  const fetchData = async () => {
    const token =
      "2ca1d8120bae3fc23a56a6e25a9bf46605f3a154e7fcbc71767228515db89ca5156ae736595a96fba22ccc7bc28d409e73183e102c771f692f3c7491303149d98c4962e6912ae9e538dc24153a28eca6c8c3aef6beed86fd600522173d1d391262438e9a7782330dbee30a2154c0cf24df96a9b7d1a2cf85c3ed11f243ff0f65"
    const response = await axios.get(
      `https://plusone.stag.host/api/artists/${artist.id}?populate=deep,4`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    setTourData(response)
  }

  const ogTitle = title + " - PlusOne"

  // console.log(tourData?.data.data.attributes)
  const artistData = tourData?.data.data.attributes

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

  if (postResponse.data) {
    https: return {
      props: {
        artist: postResponse.data.data[0],
      },
    }
  }
}

export default ArtistPage
