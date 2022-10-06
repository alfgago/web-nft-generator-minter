import Head from "next/head"

import Artist from "@/components/Artist"
import ArtistHero from "@/components/ArtistHero"

const ArtistPage = () => {
  const title = "Kings of Leon"
  const artistName = "Caleb Followill"
  const bio =
    "Kings of Leon is an American rock band that formed in Nashville, Tennessee, in 1999. The band is composed of brothers Caleb, Nathan and Jared Followill with their cousin Matthew Followill."
  const genre = "Nashville Rock"
  const image = "/assets/img/artist-pic.png"

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
