import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HomeHeroStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.white};
  overflow: hidden;
  padding-bottom: 6rem;

  .background-gradient {
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
      content: "";
      position: absolute;
      top: 50%;
      margin-top: -4rem;
      right: 0;
      width: 100%;
      height: 100%;
      background: url("/assets/img/watermark.svg") no-repeat top right;
    }
  }

  .top {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 5rem 0 2rem 0;

    h2 {
      position: absolute;
      bottom: 2rem;
      margin-left: ${553 / 16}rem;
      padding-left: ${100 / 16}rem;
      font-size: ${64 / 16}rem;
      line-height: 1;
    }

    .artist {
      width: ${215 / 16}rem;
      margin-left: ${100 / 16}rem;

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
        font-size: ${18 / 16}rem;
        padding: 0.5em 1em;
      }

      &:first-of-type {
        width: ${553 / 16}rem;
        margin-left: 0;

        .name {
          font-size: ${30 / 16}rem;
        }

        .img-container {
          padding-bottom: ${359 / 16}rem;
        }
      }
    }
  }
`
