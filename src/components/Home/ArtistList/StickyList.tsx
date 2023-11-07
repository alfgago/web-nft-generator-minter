// @ts-nocheck

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"

import { CommonPill } from "@/components/Common/CommonStyles"
import GradientBackground from "@/components/Common/GradientBackground"
import cleanUrl from "@/utils/cleanUrl"

const StickyList = ({
  artists,
  title,
  buttonTitle,
  buttonLink,
  width,
  height,
}: any) => {
  const [listSize, setListSize] = useState(0)

  useEffect(() => {
    const scrollerW = document.getElementById("scroller")?.offsetWidth ?? 0
    const items = document.querySelectorAll(".scroller .artist-item")
    const last = items[items.length - 1]

    const content = document.querySelector(".artist-list .content")
    setListSize(
      scrollerW - last.offsetWidth - content.getBoundingClientRect().left / 2
    )
  }, [width])

  useEffect(() => {
    if (listSize) {
      setTimeout(initScrollMagic, 1000)
    }
  }, [listSize])

  const initScrollMagic = () => {
    if (!window.controller) {
      window.controller = new window.ScrollMagic.Controller() // Use globally available ScrollMagic
    } else {
      destroyScenes(window.controller)
    }

    const scene1 = new window.ScrollMagic.Scene({
      duration: height * (artists.length - 4),
      triggerElement: "#sticky-artists-trigger",
      triggerHook: "onLeave",
    })
      .setPin(".artist-list")
      .addTo(window.controller)

    const scene2 = new window.ScrollMagic.Scene({
      duration: height * (artists.length - 4),
      triggerElement: "#scrolly-trigger",
      triggerHook: "onLeave",
    })
      .addTo(window.controller)
      .on("progress", (e: any) => {
        const targetX = -listSize * e.progress
        gsap.to(".scroller", 0.1, {
          x: targetX,
        })
      })
    window.controller.scenes.push(scene1)
    window.controller.scenes.push(scene2)
  }

  const destroyScenes = (controller) => {
    // Assuming controller.scenes is an array holding references to your scenes
    controller.scenes.forEach((scene) => {
      scene.destroy(true)
    })
    controller.scenes = [] // Clear the array after destroying the scenes
  }

  return (
    <div className="featured-artists">
      <div id="sticky-artists-trigger" />
      <div id="scrolly-trigger" />
      <section className="artist-list">
        <GradientBackground />
        <div className="content">
          <div className="section-header">
            <h2>{title}</h2>
            <Link legacyBehavior href={buttonLink} scroll={false}>
              <a className="link">
                <CommonPill className="clickable pink">
                  {buttonTitle}
                </CommonPill>
              </a>
            </Link>
          </div>
          <div className="scroll-scene">
            <div className="scroller items" id="scroller">
              {artists.map((item: any, index: any) => {
                const slug = item.attributes.slug
                const name = item.attributes.name
                const image =
                  item.attributes?.profile_picture?.data.attributes.url
                const imageW =
                  item.attributes?.profile_picture?.data.attributes.width
                const imageH =
                  item.attributes?.profile_picture?.data.attributes.height
                return (
                  <div className="artist-item" key={slug + index}>
                    <div className="inner">
                      <div className="image-container">
                        <Image
                          src={cleanUrl(image)}
                          alt={slug}
                          quality={90}
                          width={imageW}
                          height={imageH}
                        />
                      </div>
                      <div className="bar">
                        <h3 className="title">{name}</h3>
                        <Link
                          legacyBehavior
                          href={"/artist/" + slug}
                          scroll={false}
                        >
                          <a className="link">
                            <CommonPill className="clickable small">
                              Learn more
                            </CommonPill>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="p1-side-logo">
                <img
                  src="/assets/img/plusone-logo-vertical.png"
                  alt="PlusOne Side Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StickyList
