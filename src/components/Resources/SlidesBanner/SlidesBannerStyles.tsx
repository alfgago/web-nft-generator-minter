import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const SlidesBannerStyles = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  background: linear-gradient(-90deg, #28324d 30%, #000 90%);
  color: ${COLORS.white};
  padding-bottom: 1rem;

  &.fans {
    background: linear-gradient(-90deg, #4c284d 30%, #000 90%);
  }

  .content {
    position: static;
  }

  h1 {
    font-weight: 300;
    padding-top: 2rem;
    @media ${DEVICE.laptop} {
      padding-top: 0;
    }
  }

  .swiper {
    overflow: visible;

    span.swiper-pagination-bullet {
      position: relative;
      display: inline-block;
      transition: 0.5s ease all;
      background: #fff;
      width: ${10 / 16}rem;
      height: ${10 / 16}rem;
    }

    span.swiper-pagination-bullet.swiper-pagination-bullet-active {
      height: ${16 / 16}rem;
      top: ${3 / 16}rem;
    }
  }

  .swiper-slide {
    .inner {
      position: relative;
      transition: 1.5s ease opacity;
      opacity: 0;
    }

    img {
      position: absolute;
      right: 0%;
      top: 0;
      transition: 1.5s ease opacity;
      opacity: 0;
      transform: translate(30%, -2rem);
    }

    &.swiper-slide-active {
      .inner {
        transition-delay: 0.25s;
        opacity: 1;
      }
      img {
        right: 0;
        transition-delay: 1s;
        opacity: 1;
      }
    }
  }

  .slide {
    width: 100%;

    .inner {
      position: relative;
      z-index: 1;
      padding-top: 2rem;
      padding-bottom: 2rem;
      text-shadow: 0 0 15px rgb(0 0 0 / 30%);
      @media ${DEVICE.laptop} {
        padding-bottom: ${70 / 16}rem;
        padding-top: ${50 / 16}rem;
        padding-right: 10%;
      }
    }

    img {
      width: ${567 / 16}rem;
      height: ${567 / 16}rem;
      max-width: 100vw;
      max-height: 100vw;
    }

    .title {
      margin-bottom: ${40 / 16}rem;
      font-weight: 600;
      line-height: 1.1;
    }
    .description {
      font-family: "Inter";
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      @media ${DEVICE.laptop} {
        font-size: ${32 / 16}rem;
        line-height: ${39 / 16}rem;
      }
    }
  }
`
