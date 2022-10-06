import Head from "next/head"

import Artist from "@/components/Artist"
import ArtistHero from "@/components/ArtistHero"

const ArtistPage = () => {
  const title = "Steve Aoki"
  const artistName = ""
  const bio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna lorem, gravida at mi et, feugiat bibendum arcu. Donec nec suscipit lorem. Sed varius venenatis felis nec convallis."
  const genre = "DJ"
  const image = "/assets/img/Steve-Aoki-purple-800x400 1.png"

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

export default ArtistPage
