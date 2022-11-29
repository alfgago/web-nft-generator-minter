import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react" // Import Swiper styles

import { CommonPill } from "@/components/Common/CommonStyles"

import "swiper/css"

const ArtistsSwiper = ({ artists, width, height }: any) => {
  return (
    <div className="featured-artists">
      <section className="artist-list">
        <div className="content">
          <div className="section-header">
            <h2>Featured Artists</h2>
            <Link href="artists" scroll={false}>
              <a className="link">
                <CommonPill className="clickable pink">All artists</CommonPill>
              </a>
            </Link>
          </div>
          <div className="carousel">
            <Swiper
              spaceBetween={30}
              slidesPerView={1.5}
              direction={"horizontal"}
              navigation
              pagination={{ clickable: true }}
            >
              {artists &&
                artists.length >= 1 &&
                artists.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="artist-item">
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
                          <Link href={"/artist/" + item.slug} scroll={false}>
                            <a className="link">
                              <CommonPill className="clickable">
                                Learn more
                              </CommonPill>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              <SwiperSlide>
                <div className="p1-side-logo">
                  <img
                    src="/assets/img/p1-side-logo.svg"
                    alt="PlusOne Side Logo"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArtistsSwiper