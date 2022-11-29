import Link from "next/link"

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

      <div className="content">
        <h1>{title}</h1>
        <div className="copy">{copy}</div>
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
