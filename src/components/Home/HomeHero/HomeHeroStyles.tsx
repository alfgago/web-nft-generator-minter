import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HomeHeroStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.white};
  overflow: hidden;
  padding-bottom: 6rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 8rem;

  @media ${DEVICE.laptop} {
    height: 90vh;
    min-height: ${880 / 16}rem;
    padding-top: 7rem;
  }

  .abs {
    width: 100%;
    pointer-events: none;
    z-index: 9;
    padding-top: 1rem;

    .content {
      padding: 0;
    }

    @media ${DEVICE.laptop} {
      position: absolute;
      top: 5rem;
      right: 0;
      height: 100%;
      padding-top: 0;
    }

    .right {
      width: 100%;
      height: 100%;
      margin-left: auto;
      @media ${DEVICE.laptop} {
        width: 35%;
      }
    }
  }

  .content {
    position: relative;
    margin: 0 auto;
    padding-top: 0;
    padding-bottom: 2rem;
    @media ${DEVICE.laptop} {
      padding-bottom: 6rem;
      .left {
        width: 60%;
      }
    }

    &.screen {
      z-index: 1;
      mix-blend-mode: screen;
    }

    h1 {
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 3rem;
      line-height: 1;
      text-shadow: 0 0 15px rgb(0 0 0 / 30%);

      @media ${DEVICE.laptop} {
        font-size: ${60 / 16}rem;
        max-width: ${850 / 16}rem;
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
      font-weight: 900;
      font-size: 2rem;
      &:hover {
        color: #fff;
        background: transparent;
      }

      @media ${DEVICE.laptop} {
        font-size: 1.8rem;
        line-height: 1.2;
      }
    }
  }

  .background {
    background: #000 !important;
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
    pointer-events: none;

    @media ${DEVICE.laptop} {
      right: 0;
      top: -4rem;
      width: 100%;
      height: 100%;
      background-size: 38%;
    }
  }
  

  .banner-logo {
    position: relative;
    pointer-events: none;
    margin-bottom -5rem;
    left: -3.5rem;
    padding: 0;

    @media ${DEVICE.laptop} {
      left: -2rem;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 24rem;
      height: 16rem;  
      background: url(/assets/img/logo-hero-masked-stroke.svg);
      background-repeat: no-repeat;

      @media ${DEVICE.laptop} {
        width: 26rem;
      }
    }

    .grad {
      position: relative;
      width: 24rem;
      height: 16rem;
      mask-image: url(/assets/img/logo-hero-masked.svg);
      mask-repeat: no-repeat;

      @media ${DEVICE.laptop} {
        width: 26rem;
      }

      canvas {
        width: 110%;
        height: 110%;
        top: -5%;
        left: -5%;
      }
    }
  }

  .upcoming-svg {
    display: none;
    pointer-events: none;

    @media ${DEVICE.laptop} {
      display: block;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;

        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: auto;
          transform: translateY(-50%);
          right: 10rem;
          width: 6rem;
          height: 80vh;
          max-height: 75%;
          z-index: 0;          
          background: url(/assets/img/upcoming-shows-text-stroke.svg);
          background-repeat: no-repeat;
        }

      .grad {
        display: block;
        position: absolute;
        top: 50%;
        left: auto;
        transform: translateY(-50%);
        right: 10rem;
        height: auto;
        max-height: 75%;
        z-index: -1;
        opacity: 0.9;
        
        width: 6rem;
        height: 80vh;
        mask-image: url(/assets/img/upcoming-shows-text.svg);
        mask-type: luminance;
        mask-repeat: no-repeat;

        canvas {
          width: 80vw;
          height: 110%;
          top: -5%;
          left: -5%;
        }
      }
    }

    &.stroked {
      mix-blend-mode: unset;
      .st1 {
        fill: none;
        stroke-width: 2px;
        stroke: #fff;
      }

      .st0 {
        display: none;
      }
    }
  }
`
