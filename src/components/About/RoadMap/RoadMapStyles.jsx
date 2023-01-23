import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const RoadMapStyles = styled.section`
  padding: 0;
  display: flex;
  position: relative;
  flex-direction: column;
  @media ${DEVICE.laptop} {
    flex-direction: row;
  }

  .bg {
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    svg {
      width: 63rem;
    }
  }
  .col-1,
  .col-2 {
    width: 100%;
    position: relative;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: ${85 / 16}rem;

    h2 {
      padding-bottom: 76px;
    }

    first-type-of:h3 {
      padding-top: 3rem;
    }

    div > div {
      margin-bottom: ${68 / 16}rem;
      p {
        margin: 0;
        padding-top: 1rem;
      }
    }

    .description {
      max-width: ${444 / 16}rem;
    }

    .spacer {
      display: none;

      @media ${DEVICE.laptop} {
        display: block;
        color: transparent;
      }
    }
  }

  .col-1 {
    color: ${COLORS.white};

    @media ${DEVICE.laptop} {
      color: ${COLORS.black};
    }

    &:before {
      content: "";
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      transform-origin: center;
      background: linear-gradient(90.16deg, #000000 0.12%, #37648d 100%);

      @media ${DEVICE.laptop} {
        background: linear-gradient(
          94.68deg,
          #f9e9ff 3.08%,
          rgba(255, 255, 255, 0) 88.15%,
          rgba(255, 255, 255, 0) 88.15%
        );
      }
    }
  }

  .col-2 {
    color: ${COLORS.white};
    @media ${DEVICE.maxlaptop} {
      .content {
        padding-top: 0rem;
      }
    }

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
      text-align: start;
      align-items: flex-start;
      @media ${DEVICE.laptop} {
        align-items: flex-end;
        text-align: end;
      }
    }
  }
`
