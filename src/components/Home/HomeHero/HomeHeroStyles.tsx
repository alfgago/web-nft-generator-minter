import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HomeHeroStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.white};
  overflow: hidden;
  padding-bottom: 6rem;

  .content {
    z-index: 5;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .gradient {
      background: #0217fc;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      img {
        position: absolute;
        top: -2rem;
        left: -2rem;
        width: calc(100% + 4rem);
        height: calc(100% + 4rem);
        object-fit: cover;
        opacity: 0.1;
        transition: 3s linear all;

        &.active {
          opacity: 1;
        }
      }

      &:after {
        position: absolute;
        left: 0px;
        top: 0px;
        content: "";
        width: 100%;
        height: 100%;
        mix-blend-mode: soft-light;
        background: rgb(0, 0, 0);
        filter: url(#f) contrast(140%) brightness(500%) invert(100%);
        z-index: 5;
        pointer-events: none;
        opacity: 1;
      }
    }

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      right: -30vw;
      top: 60%;
      background: url("/assets/img/watermark.svg") no-repeat top right;
      background-size: contain;
      z-index: 5;

      @media ${DEVICE.laptop} {
        right: 0;
        top: 50%;
        width: 100%;
        height: 100%;
        margin-top: -4rem;
        background-size: auto;
      }
    }
  }

  .top {
    position: relative;
    padding: 5rem 0 0 0;

    @media ${DEVICE.laptop} {
      display: flex;
      align-items: flex-start;
      padding: 5rem 0 2rem 0;
    }

    h2 {
      position: relative;
      margin-bottom: ${30 / 16}rem;
      line-height: 1;

      @media ${DEVICE.laptop} {
        margin-left: ${100 / 16}rem;
        position: absolute;
        bottom: 2rem;
        margin-bottom: 0;
        margin-left: ${553 / 16}rem;
        padding-left: ${100 / 16}rem;
        font-size: ${64 / 16}rem;
      }
    }

    .artist {
      width: 27%;
      margin-left: 73%;
      margin-bottom: ${25 / 16}rem;

      @media ${DEVICE.laptop} {
        width: ${215 / 16}rem;
        margin-left: ${100 / 16}rem;
        margin-bottom: 0;
      }

      .link {
        display: block;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      }

      .img-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .name {
        background: #000;
        color: #fff;
        padding: 0.5em 1em;
        font-size: 12px;

        @media ${DEVICE.laptop} {
          font-size: ${18 / 16}rem;
        }
      }

      &:first-of-type {
        position: absolute;
        width: 73%;
        left: 0;
        margin-left: 0;
        padding-right: 25px;

        .name {
          font-size: 15px;
        }

        @media ${DEVICE.laptop} {
          width: ${553 / 16}rem;
          position: relative;
          padding-right: 0;

          .name {
            font-size: ${30 / 16}rem;
          }

          .img-container {
            padding-bottom: ${359 / 16}rem;
          }
        }
      }
    }
  }
`
