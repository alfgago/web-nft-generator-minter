import styled from "styled-components"

interface Props {
  screenHeight: number
  screenWidth: number
  length: number
}
import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistListStyles = styled.div<Props>`
  position: relative;
  padding: 0;
  margin: 0;
  background: #000;

  @media ${DEVICE.laptop} {
    height: ${(props) => props.screenHeight * props.length}px;
  }

  .featured-artists {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .section-header {
    display: flex;
    position: relative;
    z-index: 3;
    margin-bottom: 2rem;
    gap: 50px;
    align-items: top;

    @media ${DEVICE.laptop} {
      min-height: 6.5rem;
      align-items: center;
    }

    h2 {
      font-weight: 600;
      line-height: 1;
      text-shadow: 0 0 15px rgb(0 0 0 / 30%);
      color: #fff;
      margin-bottom: 0;

      @media ${DEVICE.laptop} {
        font-size: ${90 / 16}rem;
        line-height: ${90 / 16}rem;
        margin-right: ${50 / 16}rem;
      }
    }
  }

  .content {
    display: block;

    @media ${DEVICE.laptop} {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .scroll-scene {
    position: relative;
    height: 100%;
    > div {
      position: relative;
      height: 100%;
    }
    .scroller {
      position: absolute;
      left: 0;
      height: 100%;
      display: flex;
      width: auto;
      max-width: none;
    }
  }

  .artist-list {
    position: relative;
    width: 100%;
    z-index: 1;

    @media ${DEVICE.laptop} {
      position: absolute;
      top: 0;
      left: 0;
      height: ${(props) => props.screenHeight}px;
    }

    .carousel {
      margin: 0 -2rem;
      .swiper-slide {
        margin-left: 30px !important;
        margin-right: 0 !important;
      }
    }

    &:before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 90%;
      height: 100%;

      background-image: url("/assets/img/watermark2.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: left top;
      pointer-events: none;

      @media ${DEVICE.laptop} {
        width: 50%;
        opacity: 0.4;
      }
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      pointer-events: none;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 90%
      );
      z-index: 1;
    }

    .p1-side-logo {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 8px;
      @media ${DEVICE.laptop} {
        justify-content: center;
        padding: 5rem;
        img {
          height: 100%;
        }
      }
    }

    .artist-item {
      position: relative;
      @media ${DEVICE.laptop} {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        margin-right: ${50 / 16}rem;
      }

      &:last-of-type {
        margin: 0;
      }

      .inner {
        position: relative;

        @media ${DEVICE.laptop} {
          width: 100%;
          max-width: 100%;
          height: 100%;
          padding-bottom: ${90 / 16}rem;
        }

        .image-container {
          position: relative;
          height: 0;
          padding-bottom: 75%;
          width: 100%;

          img {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          @media ${DEVICE.laptop} {
            height: 100%;
            padding: 0;
            img {
              width: auto;
              position: relative;
            }
          }
        }

        .bar {
          width: 100%;
          display: flex;
          align-items: center;
          background: #fff;
          min-height: 50px;
          padding: 0 15px;

          @media ${DEVICE.laptop} {
            position: absolute;
            bottom: 0;
            left: 0;
            height: ${90 / 16}rem;
            padding: 0 ${40 / 16}rem;
          }

          h3 {
            color: #000;
            font-size: 17px;
            line-height: 1;
            font-weight: 600;
            margin: auto;

            @media ${DEVICE.laptop} {
              font-size: ${31 / 16}rem;
              line-height: ${33 / 16}rem;
              margin: 0;
            }
          }
          a {
            display: block;
            margin-left: auto;

            @media ${DEVICE.maxlaptop} {
              position: absolute;
              top: 8px;
              right: 8px;
              .clickable {
                font-size: 10px;
                padding: 3px 6px;
                color: #fff;
                border-color: #fff;
              }
            }
          }
        }
      }
    }
  }
`
