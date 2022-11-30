import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const GradientBackgroundStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: brightness(1.1);
  pointer-events: none;
  mix-blend-mode: screen;

  canvas {
    position: absolute;
    top: 50%;
    left: -10%;
    height: 150%;
    width: 120%;
    transform: translateY(-50%);
    opacity: 1;

    @media ${DEVICE.laptop} {
      left: auto;
      top: -5vh;
      right: -5vw;
      height: 110vh;
      width: 110vw;
      transform: none;
    }

    &.active {
      opacity: 1;
    }

    &#gradient-canvas {
      z-index: 1;
      --gradient-color-1: #fb00fb;
      --gradient-color-2: #1415ff;
      --gradient-color-3: #00ecff;
      --gradient-color-4: #000000;
      filter: blur(25px);
      opacity: 0.9;
    }

    &#grain-canvas {
      z-index: 2;
      opacity: 0.8;
    }
  }

  .cursorColumn2 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  svg {
    position: absolute;
  }

  #mouseover {
    display: none;

    @media ${DEVICE.laptop} {
      display: block;
      z-index: 2;
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      width: 1px;
      height: 1px;
      mix-blend-mode: soft-light;

      > div {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60vw;
        height: 60vw;
        display: block;
        transform: translate(-50%, -50%);
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-duration: 10s;
        transition: 0.5s ease all;
        mix-blend-mode: screen;

        &.color1 {
          background: radial-gradient(
            circle,
            ${(props) => (props.mouseColors ? props.mouseColors[0] : "#83bc8b")}
              5%,
            rgba(255, 255, 255, 0) 50%
          );
        }

        &.color2 {
          background: radial-gradient(
            circle,
            ${(props) => (props.mouseColors ? props.mouseColors[1] : "#83bc8b")}
              5%,
            rgba(255, 255, 255, 0) 50%
          );
          margin-top: -8vh;
          animation-name: gradientMouse2;
          animation-duration: 12s;
        }

        &.color3 {
          background: radial-gradient(
            circle,
            ${(props) => (props.mouseColors ? props.mouseColors[3] : "#83bc8b")}
              5%,
            rgba(255, 255, 255, 0) 30%
          );
          margin-top: 8vh;
          animation-name: gradientMouse3;
          animation-duration: 14s;
        }
      }
    }
  }
`
