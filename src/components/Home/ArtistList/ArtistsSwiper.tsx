import Image from "next/future/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react" // Import Swiper styles

import { CommonPill } from "@/components/Common/CommonStyles"
import s3url from "@/utils/s3url"

import "swiper/css"

const ArtistsSwiper = ({ artists, title, buttonTitle, buttonLink }: any) => {
  return (
    <div className="featured-artists">
      <section className="artist-list">
        <div className="content">
          <div className="section-header">
            <h2>{title}</h2>
            <Link href={buttonLink} scroll={false}>
              <a className="link">
                <CommonPill className="clickable pink">
                  {buttonTitle}
                </CommonPill>
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
                artists.map((item: any, index: number) => {
                  const slug = item.attributes.slug
                  const name = item.attributes.name
                  const image =
                    item.attributes?.profile_picture?.data.attributes.url
                  const imageW =
                    item.attributes?.profile_picture?.data.attributes.width
                  const imageH =
                    item.attributes?.profile_picture?.data.attributes.height
                  return (
                    <SwiperSlide key={index}>
                      <div className="artist-item">
                        <div className="inner">
                          <div className="image-container">
                            <Image
                              src={s3url(image)}
                              alt={slug}
                              quality={90}
                              width={imageW}
                              height={imageH}
                            />
                          </div>
                          <div className="bar">
                            <h3 className="title">{name}</h3>
                            <Link href={"/artist/" + slug} scroll={false}>
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
                  )
                })}
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
