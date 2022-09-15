import React from "react"
import { HeroStyled, ArtistImage, ImageOverlap } from "./HeroStyles"

const Hero = () => {
  return (
    <HeroStyled>
      <div className="content">
        <ArtistImage image="./resources/img/artist-pic.png">
          <img
            src="./resources/img/plusone-logo-vertical.png"
            alt="plusOne-vertical"
            className="waterMarkLogo"
          />
        </ArtistImage>
        <ImageOverlap image="./resources/img/bg-artist-base.png">
          More Info
        </ImageOverlap>
      </div>
    </HeroStyled>
  )
}

export default Hero
