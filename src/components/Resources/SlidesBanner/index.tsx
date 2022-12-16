import { EffectFade, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react" // Import Swiper styles

import { SlidesBannerStyles } from "./SlidesBannerStyles"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const SlidesBanner = ({ title, slides, style }: any) => {
  let nextShape = 0
  const shapes =
    style == "fans"
      ? [
          "/assets/img/resources-star.png",
          "/assets/img/resources-cross.png",
          "/assets/img/resources-circle.png",
        ]
      : [
          "/assets/img/resources-starb.png",
          "/assets/img/resources-crossb.png",
          "/assets/img/resources-circleb.png",
        ]
  return (
    <SlidesBannerStyles className={style}>
      <div className="content">
        <h1>{title}</h1>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        direction={"horizontal"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        effect="fade"
        modules={[EffectFade, Pagination]}
      >
        {slides.length >= 0 &&
          slides.map((item: any, index: number) => {
            const title = item.title
            const description = item.description
            const shape = shapes[nextShape]
            nextShape++
            if (nextShape == shapes.length) {
              nextShape = 0
            }
            return (
              <SwiperSlide key={"banner-" + index}>
                <div className="slide">
                  <div className="content">
                    <div className="inner">
                      <div className="title h2">{title}</div>
                      <p className="description">{description}</p>
                    </div>
                  </div>
                  <img src={shape} alt="PlusOne resources shape" />
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </SlidesBannerStyles>
  )
}

export default SlidesBanner
