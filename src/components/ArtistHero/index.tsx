import React from "react"
import Image from "next/future/image"
import { useWindowSize } from "usehooks-ts"

import s3url from "@/utils/s3url"

import { ArtistHeroStyled, ArtistImage } from "./ArtistHeroStyles"

const ArtistHero = ({ title, artistName, bio, genre, image }: any) => {
  const { height, width } = useWindowSize()

  return (
    <ArtistHeroStyled>
      <ArtistImage overlay="/assets/img/bg-artist-base.png">
        <div className="background-image">
          <Image
            src={s3url(image.url)}
            alt={title}
            quality={90}
            width={width * 0.8}
            height={height}
          />
        </div>
        <img
          src="/assets/img/plusone-logo-vertical.png"
          alt="plusOne-vertical"
          className="watermark-logo"
        />
        <div className="overlay" />
      </ArtistImage>
      <div className="content">
        <div className="artist-info">
          <h1 className="title">{title}</h1>
          <div className="name">{artistName}</div>
          <div className="bio">{bio}</div>
          <div className="genre">{genre}</div>
        </div>
      </div>
    </ArtistHeroStyled>
  )
}

export default ArtistHero
