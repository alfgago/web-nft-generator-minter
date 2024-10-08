import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const MoreStyles = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  color: ${COLORS.black};
  z-index: 500;

  .content {
    display: flex;
    flex-direction: column;
    z-index: 5;
    align-items: flex-start;

    h2 {
      max-width: ${940 / 16}rem;
      margin-bottom: 2rem;
      order: 1;
      @media ${DEVICE.laptop} {
        margin-bottom: 3rem;
      }
    }

    .description {
      font-size: ${16 / 16}rem;
      margin: auto;
      order: 2;
      margin-bottom: 2rem;
      @media ${DEVICE.laptop} {
        max-width: ${650 / 16}rem;
        font-size: ${36 / 16}rem;
        margin-bottom: 3rem;
        margin-left: 0;
      }
    }

    .btn {
      display: inline-block;
      order: 3;
    }
  }

  &:after,
  &:before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .top-triangle {
    display: none;
  }

  &.useBorder {
    .top-triangle {
      display: block;
      position: absolute;
      width: 100%;
      object-fit: cover;
      height: 4.5rem;
      top: -4.5rem;
    }

    &:before {
      top: -4.5rem;
      height: calc(100% + 4.5rem);
    }

    section {
      padding-top: 0;
      @media ${DEVICE.laptop} {
        padding-top: 3rem;
      }
    }
  }

  &.blue {
    &:after {
      height: 50%;
      background-image: url("/assets/img/more-blue-bg.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: right top;
      z-index: 1;
      @media ${DEVICE.laptop} {
        height: 100%;
        left: auto;
        right: 4rem;
      }
    }

    &:before {
      background: linear-gradient(
        149deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(216, 245, 254, 1) 80%
      );
      z-index: 1;
    }
  }

  &.purple {
    &:after {
      display: none;
      height: 50%;
      background-image: url("/assets/img/more-pink-bg.svg");
      background-size: auto 80%;
      background-repeat: no-repeat;
      background-position: right center;
      z-index: 1;
      @media ${DEVICE.laptop} {
        height: 100%;
        left: auto;
        right: 4rem;
      }
    }
    &:before {
      background: linear-gradient(
        -80.62deg,
        #f9e9ff 8.41%,
        rgba(255, 255, 255, 0.9) 88.16%
      );
    }

    .floating-icons {
      pointer-events: none;
      order: -5;
      position: absolute;
      top: 0;
      left 0;
      width: 100%;
      height: 100%;

      > span {
        position: absolute;
        left: 0;
        top: 0;
        svg {
          width: 100%;
          height: 100%;
          opacity: 0.1;
          @media ${DEVICE.laptop} {
            opacity: 1;
          }
        }
        path {
          stroke: #C505F0;
        }

        &.square1 {
          left: 39%;
          top: -3%;
          min-width: 1.75vw;
        }

        &.square2 {
          left: 68%;
          top: -7%;
          min-width: 1.75vw;
        }

        &.star {
          left: 57%;
          top: 37%;
          min-width: 3vw;
        }
      }
    }
  }

  .image-cont {
    position: absolute;
    right: 0;
    bottom: -3.5rem;
    max-width: 33vw;
    @media ${DEVICE.laptop} {
      position: absolute;
      right: 0;
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      width: 26rem;
      max-width: 50vw;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  img {
    pointer-events: none;
  }
`
