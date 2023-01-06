import Link from "next/link"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import GradientBackground from "@/components/Common/GradientBackground"

import { HomeHeroStyles } from "./HomeHeroStyles"

const HomeHero = ({ title, copy, image }: any) => {
  return (
    <HomeHeroStyles>
      <div
        className="background"
        style={{
          backgroundImage: image.data
            ? `url(${image.data.attributes.url})`
            : "",
        }}
      >
        <GradientBackground />
      </div>
      <div className="watermark" />

      <div className="banner-logo content">
        <ReactSVG src="/assets/img/logo-hero.svg" />
      </div>
      <div className="content">
        <h1 className="title">{title}</h1>
        {copy && <div className="copy">{copy}</div>}
        <Link href="/">
          <a>
            <CommonPill className="btn clickable fill">Sign Up</CommonPill>
          </a>
        </Link>
      </div>
    </HomeHeroStyles>
  )
}

export default HomeHero
