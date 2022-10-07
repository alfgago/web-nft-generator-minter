import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const MoreStyles = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  overflow: hidden;

  .content {
    z-index: 2;

    h2 {
      font-size: ${64 / 16}rem;
      max-width: ${940 / 16}rem;
      margin-bottom: ${50 / 16}rem;
    }

    .description {
      font-size: ${36 / 16}rem;
      max-width: ${572 / 16}rem;
      margin-left: auto;
      margin-top: -3rem;
    }
  }

  .top-triangle {
    position: relative;
    width: 100%;
    height: 4.5rem;
    object-fit: cover;
  }

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.useBorder {
    margin-top: -4.5rem;

    section {
      padding-top: 2rem;
    }
  }

  .star {
    position: absolute;
    top: 70%;
    left: 30%;
    width: ${56 / 16}rem;
    z-index: 3;
  }

  .square {
    position: absolute;
    top: ${60 / 16}rem;
    left: ${60 / 16}rem;
    width: ${27 / 16}rem;
    z-index: 3;
  }

  .square-2 {
    position: absolute;
    top: ${70 / 16}rem;
    left: 70%;
    width: ${27 / 16}rem;
  }

  .square-3 {
    position: absolute;
    top: 90%;
    left: 80%;
    width: ${27 / 16}rem;
  }

  &.blue {
    &:before {
      background: linear-gradient(
        149deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(216, 245, 254, 1) 80%
      );
      z-index: 1;
    }
  }

  &.pink {
    &:before {
      background: linear-gradient(
        -80.62deg,
        #f9e9ff 8.41%,
        rgba(255, 255, 255, 0.9) 88.16%
      );
    }

    .star {
      position: absolute;
      top: 60%;
      left: 45%;
      width: ${56 / 16}rem;
      z-index: 3;
    }

    .square {
      position: absolute;
      top: ${70 / 16}rem;
      left: 35%
      width: ${27 / 16}rem;
      z-index: 3;
    }

    .square-2 {
      position: absolute;
      top: ${60 / 16}rem;
      left: 75%;
      width: ${27 / 16}rem;
    }

    .square-3 {
      display: none;
    }
  }

  img {
    pointer-events: none;
  }
`
