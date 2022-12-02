import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HomeHeroStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.white};
  overflow: hidden;
  padding-bottom: 6rem;
  height: auto;
  @media ${DEVICE.laptop} {
    height: 100vh;
    min-height: 600px;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 6rem;
    padding-bottom: 2rem;
    @media ${DEVICE.laptop} {
      padding-top: 0;
      padding-bottom: 6rem;
    }

    z-index: 5;
    h1 {
      font-size: 85px;
      font-weight: 600;
      margin-bottom: 1rem;
      line-height: 1;
      text-shadow: 0 0 15px rgb(0 0 0 / 30%);

      @media ${DEVICE.laptop} {
        font-size: ${128 / 16}rem;
      }
    }
    .copy {
      font-size: 28px;
      max-width: ${740 / 16}rem;
      line-height: 1;
      font-weight: 500;
      margin-bottom: 3rem;
      text-shadow: 0 0 15px rgb(0 0 0 / 30%);

      @media ${DEVICE.laptop} {
        font-size: ${64 / 16}rem;
      }
    }

    .btn {
      background: #fff;
      border: 1px solid #fff;
      color: #000;
      &:hover {
        color: #fff;
        background: transparent;
      }
    }
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: cover;
    background-position: top center;
    pointer-events: none;

    .gradient {
      opacity: 0.9;
      background: none;
      mix-blend-mode: plus-lighter;
    }
  }

  .watermark {
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
    background: url("/assets/img/watermark.svg") no-repeat top right;
    background-size: contain;
    background-position: bottom right;
    z-index: 5;

    @media ${DEVICE.laptop} {
      right: 0;
      top: -4rem;
      width: 100%;
      height: 100%;
      background-size: 38%;
    }
  }
`
