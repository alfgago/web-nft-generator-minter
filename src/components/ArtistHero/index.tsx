import React from "react"
import Image from "next/image"
import { ReactSVG } from "react-svg"
import { useWindowSize } from "usehooks-ts"

import cleanUrl from "@/utils/cleanUrl"

import { ArtistHeroStyled, ArtistImage } from "./ArtistHeroStyles"

const ArtistHero = ({ title, artistName, bio, genre, image }: any) => {
  const { height, width } = useWindowSize()

  return (
    <ArtistHeroStyled>
      <ArtistImage overlay="/assets/img/bg-artist-base.png">
        <div className="background-image">
          <Image
            src={cleanUrl(image.url)}
            alt={title}
            quality={90}
            width={1600}
            height={1200}
          />
        </div>
        <img
          src="/assets/img/plusone-logo-vertical.png"
          alt="plusOne-vertical"
          className="watermark-logo"
        />
        <div className="image-overlay" />
      </ArtistImage>
      <div className="content">
        <div className="artist-info">
          <h1 className="title">{title}</h1>
          <div className="name">{artistName}</div>
          <div
            className="bio"
            dangerouslySetInnerHTML={{
              __html: bio,
            }}
          />
          <div className="socials">
            <a href="#" target="_blank" rel="noreferrer">
              <ReactSVG src="/assets/icons/spotify.svg" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <ReactSVG src="/assets/icons/youtube.svg" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <ReactSVG src="/assets/icons/instagram.svg" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <ReactSVG src="/assets/icons/facebook.svg" />
            </a>
          </div>
          <div className="genre">{genre}</div>
        </div>
      </div>
    </ArtistHeroStyled>
  )
}

export default ArtistHero
