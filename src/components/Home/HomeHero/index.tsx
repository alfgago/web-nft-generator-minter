import { useEffect, useState } from "react"

import { CommonPill } from "@/components/Common/CommonStyles"
import GradientBackground from "@/components/Common/GradientBackground"
import Modal from "@/components/Common/Modal"
import { usePaperSDKContext } from "@/components/PaperSDKProvider"
import UserSignUp from "@/components/UserSignup"
import cleanUrl from "@/utils/cleanUrl"

import ShowsCarousel from "../ShowsCarousel"

import { HomeHeroStyles } from "./HomeHeroStyles"

const HomeHero = ({ title, copy, image }: any) => {
  const { paperSdk, setUser } = usePaperSDKContext()
  const [toggleEdit, setToggleEdit] = useState(null)

  useEffect(() => {
    console.log("Paper SDK ", paperSdk)
  }, [])

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

          <span className="signup" onClick={() => setToggleEdit(true)}>
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

      {toggleEdit && (
        <Modal setIsOpen={setToggleEdit} title="Sign Up">
          <UserSignUp />
        </Modal>
      )}
    </HomeHeroStyles>
  )
}

export default HomeHero
