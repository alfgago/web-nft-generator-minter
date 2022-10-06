import React from "react"

import { ArtistHeroStyled, ArtistImage } from "./ArtistHeroStyles"

const ArtistHero = ({ title, artistName, bio, genre, image }: any) => {
  return (
    <ArtistHeroStyled>
      <ArtistImage image={image} overlay="/assets/img/bg-artist-base.png">
        <img
          src="/assets/img/plusone-logo-vertical.png"
          alt="plusOne-vertical"
          className="waterMarkLogo"
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
