import dynamic from "next/dynamic"
import Head from "next/head"
import axios from "axios"

import ArtistHero from "@/components/ArtistHero"

const Artist = dynamic(() => import("@/components/Artist"))

const ArtistPage = ({ artist }: any) => {
  const title = artist.attributes.name
  const bio = artist.attributes.bio
  const genre = false
  const artistName = false
  const image =
    artist.attributes.banner.data != null
      ? artist.attributes.banner.data.attributes.url
      : "https://plusone-public.s3.amazonaws.com/default_BG_edf8345a11.png?updated_at=2023-02-16T22:00:41.634Z"
  const ogTitle = title + " - PlusOne"

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
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const response = await axios.get(`${apiURL}/api/artists`, {
    params: {
      populate: "banner,events.passes,events.image",
      "filters[slug][$eq]": query.slug,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.data) {
    return {
      props: {
        artist: response.data.data[0],
      },
    }
  }
}

export default ArtistPage
