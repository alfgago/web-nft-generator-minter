import { useEffect, useState } from "react"
import Link from "next/link"
import { Tween } from "react-gsap"
import { Controller, Scene } from "react-scrollmagic"

import { CommonPill } from "@/components/Common/CommonStyles"

const StickyList = ({ artists, width, height }: any) => {
  const [listSize, setListSize] = useState(0)

  useEffect(() => {
    const scrollerW = document.getElementById("scroller")?.offsetWidth ?? 0
    setListSize(scrollerW - width)
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
                <h2>Featured Artists</h2>
                <Link href="artists" scroll={false}>
                  <a className="link">
                    <CommonPill className="clickable pink">
                      All artists
                    </CommonPill>
                  </a>
                </Link>
              </div>
              <div className="scroll-scene">
                <Scene
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
                      {artists.map((item: any, index: number) => (
                        <div className="artist-item" key={item.slug + index}>
                          <div className="inner">
                            <div className="image-container">
                              <img
                                width="500"
                                height="338"
                                src={item.image}
                                alt={item.slug}
                                loading="lazy"
                              />
                            </div>
                            <div className="bar">
                              <h3 className="title">{item.name}</h3>
                              <Link
                                href={"/artist/" + item.slug}
                                scroll={false}
                              >
                                <a className="link">
                                  <CommonPill className="clickable">
                                    Learn more
                                  </CommonPill>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="p1-side-logo">
                        <img
                          src="/assets/img/p1-side-logo.svg"
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
