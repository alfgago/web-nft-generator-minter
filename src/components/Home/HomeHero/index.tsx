import Link from "next/link"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import GradientBackground from "@/components/Common/GradientBackground"
import cleanUrl from "@/utils/cleanUrl"

import ShowsCarousel from "../ShowsCarousel"

import { HomeHeroStyles } from "./HomeHeroStyles"

const HomeHero = ({ title, copy, image }: any) => {
  return (
    <HomeHeroStyles>
      <div
        className="background"
        style={{
          backgroundImage: image.data
            ? `url(${cleanUrl(image.data.attributes.url)})`
            : "",
        }}
      />
      <div className="watermark" />

      <div className="svgs">
        <div className="banner-logo content">
          <GradientBackground
            className="grad"
            hasGrain={false}
            customCanvas="gradient-canvas-logo"
          />
        </div>
        <div className="upcoming-svg content">
          <GradientBackground
            className="grad"
            hasGrain={false}
            customCanvas="gradient-canvas-up"
          />
        </div>
      </div>
      <div className="content screen">
        <div className="left">
          <h1 className="title">{title}</h1>
          {copy && <div className="copy">{copy}</div>}
          <Link legacyBehavior href="/">
            <a>
              <CommonPill className="btn clickable fill">Sign Up</CommonPill>
            </a>
          </Link>
        </div>
      </div>
      <div className="abs">
        <div className="content">
          <div className="right">
            <ShowsCarousel />
          </div>
        </div>
      </div>
    </HomeHeroStyles>
  )
}

export default HomeHero
