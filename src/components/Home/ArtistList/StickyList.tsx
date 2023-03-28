import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tween } from "react-gsap"
import { Controller, Scene } from "react-scrollmagic"

import { CommonPill } from "@/components/Common/CommonStyles"
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
      // @ts-ignore
      scrollerW - last.offsetWidth - content.getBoundingClientRect().left / 2
    )
  }, [width])

  return (
    <div className="featured-artists">
      <Controller>
        <div id="sticky-artists-trigger" />
        <div id="scrolly-trigger" />
        <Scene
          duration={height * (artists.length - 4) + "px"}
          triggerElement="#sticky-artists-trigger"
          pin
          triggerHook={"onLeave"}
        >
          <section className="artist-list">
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
                <Scene
                  enabled={listSize > 0}
                  duration={height * (artists.length - 4) + "px"}
                  triggerElement="#scrolly-trigger"
                  triggerHook={"onLeave"}
                >
                  <Tween
                    from={{
                      x: 0 + "px",
                    }}
                    to={{
                      x: -listSize + "px",
                    }}
                  >
                    <div className="scroller items" id="scroller">
                      {artists.map((item: any, index: number) => {
                        const slug = item.attributes.slug
                        const name = item.attributes.name
                        const image =
                          item.attributes?.profile_picture?.data.attributes.url
                        const imageW =
                          item.attributes?.profile_picture?.data.attributes
                            .width
                        const imageH =
                          item.attributes?.profile_picture?.data.attributes
                            .height
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
                  </Tween>
                </Scene>
              </div>
            </div>
          </section>
        </Scene>
      </Controller>
    </div>
  )
}

export default StickyList
