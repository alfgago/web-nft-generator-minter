import { useEffect, useState } from "react"
import Link from "next/link"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import GradientBackground from "@/components/Common/GradientBackground"
import cleanUrl from "@/utils/cleanUrl"
import { PaperEmbeddedWalletSdk } from "@paperxyz/embedded-wallet-service-sdk"

import ShowsCarousel from "../ShowsCarousel"

import { HomeHeroStyles } from "./HomeHeroStyles"

const HomeHero = ({ title, copy, image }: any) => {
  const [paperSdk, setPaperSdk] = useState({})

  useEffect(() => {
    const sdk = new PaperEmbeddedWalletSdk({
      clientId:
        process.env.NEXT_PUBLIC_PAPER_TOKEN ||
        "dc69730f-5c2e-42be-8a7c-ec310da0f391",
      // @ts-ignore
      chain: process.env.NEXT_PUBLIC_PAPER_NETWORK || "Goerli",
    })
    console.log("Paper SDK ", sdk)
    setPaperSdk(sdk)
  }, [])

  const loginWithPaper = async () => {
    // @ts-ignore
    const { user } = await paperSdk.auth.loginWithPaperModal()
    sessionStorage.setItem("paperWalletAddress", user.walletAddress)

    console.log(
      "Logged in as " +
        user.authDetails.email +
        ", paper wallet is: " +
        user.walletAddress
    )
  }

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

          <span className="signup" onClick={() => loginWithPaper()}>
            <CommonPill className="btn clickable fill">Sign Up</CommonPill>
          </span>
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
