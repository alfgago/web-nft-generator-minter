import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const RoadMapStyles = styled.section`
  padding: 0;
  display: flex;
  position: relative;

  .bg {
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 63rem;
    }
  }
  .col-1,
  .col-2 {
    width: 50%;
    position: relative;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: ${85 / 16}rem;
    padding-bottom: ${215 / 16}rem;

    h2 {
      padding-bottom: 76px;
    }

    first-type-of:h3 {
      padding-top: 3rem;
    }

    span {
      margin-bottom: ${79 / 16}rem;
      p {
        margin: 0;
        padding-top: 1rem;
      }
    }

    .description {
      max-width: ${444 / 16}rem;
    }

    .spacer {
      color: transparent;
    }
  }

  .col-1 {
    &:before {
      content: "";
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        94.68deg,
        #f9e9ff 3.08%,
        rgba(255, 255, 255, 0) 88.15%,
        rgba(255, 255, 255, 0) 88.15%
      );
      transform-origin: center;
    }
  }

  .col-2 {
    color: ${COLORS.white};

    &:before {
      content: "";
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(90.16deg, #000000 0.12%, #37648d 100%);
      transform-origin: center;
    }

    .content > div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: end;
    }
  }
`
