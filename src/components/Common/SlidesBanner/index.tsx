import { EffectFade, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react" // Import Swiper styles

import { SlidesBannerStyles } from "./SlidesBannerStyles"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const SlidesBanner = ({ slides }: any) => {
  let nextShape = 0
  const shapes = [
    "/assets/img/resources-star.png",
    "/assets/img/resources-cross.png",
    "/assets/img/resources-circle.png",
  ]

  return (
    <SlidesBannerStyles>
      <Swiper
        spaceBetween={30}
        slidesPerView={1.5}
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
            const title = item.attributes.title
            const description = item.attributes.description
            const shape = shapes[nextShape]
            nextShape++
            if (nextShape == shapes.length) {
              nextShape = 0
            }
            return (
              <SwiperSlide key={"banner-" + index}>
                <div className="content">
                  <h1 className="title">{title}</h1>
                  <p>{description}</p>
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
