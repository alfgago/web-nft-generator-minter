import { useEffect, useState } from "react"

import { CommonPill } from "@/components/Common/CommonStyles"
import GradientBackground from "@/components/Common/GradientBackground"
import Modal from "@/components/Common/Modal"
import UserSignUp from "@/components/UserSignup"
import cleanUrl from "@/utils/cleanUrl"

import ShowsCarousel from "../ShowsCarousel"

import { HomeHeroStyles } from "./HomeHeroStyles"
import { useAccount } from "wagmi"

const HomeHero = ({ title, copy, image }: any) => {
  const { isConnected } = useAccount()
  const [toggleEdit, setToggleEdit] = useState(null)

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

          <div className="ctas">
            {!isConnected ? (
              <span className="signup" onClick={() => setToggleEdit(true)}>
                <CommonPill className="btn clickable fill">Sign Up</CommonPill>
              </span>
            ) : (
              <a className="signup" href="/my-passes">
                <CommonPill className="btn clickable fill">
                  See Passes
                </CommonPill>
              </a>
            )}
            <a
              className="marketplace"
              href="https://market.plusonemusic.io"
              target="_blank"
            >
              <CommonPill className="btn clickable">
                Visit Marketplace
              </CommonPill>
            </a>
          </div>
        </div>
      </div>
      <div className="abs">
        <div className="content">
          <div className="right">
            <ShowsCarousel />
          </div>
        </div>
      </div>

      {toggleEdit && (
        <Modal setIsOpen={setToggleEdit} title="Sign Up">
          <UserSignUp />
        </Modal>
      )}
    </HomeHeroStyles>
  )
}

export default HomeHero
