import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDropsStyles = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.white};
  background: #fff;
  z-index: 500;

  .content {
    display: flex;
    flex-direction: column;
    z-index: 5;
    align-items: flex-start;
    @media ${DEVICE.laptop} {
      display: block;
    }

    .head-title {
      display: flex;
      margin-bottom: 2rem;
      max-width: ${940 / 16}rem;
      align-items: center;
      @media ${DEVICE.laptop} {
        margin-bottom: 3rem;
      }
      h2 {
        color: #000;
        margin-right: 2rem;
      }
    }

    .drops {
      display: block;
      width: 100%;
      @media ${DEVICE.laptop} {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: -6.5rem;
      }

      .drop-card {
        display: none;
        &:nth-of-type(1),
        &:nth-of-type(2) {
          display: flex;
          @media ${DEVICE.laptop} {
            width: calc(30% - 1rem);
            .inner {
              padding: ${15 / 16}rem ${10 / 16}rem;
              .title,
              .price {
                font-size: ${16 / 16}rem;
                margin-bottom: 0.5rem;
              }
              .price {
                margin-bottom: 0;
              }
            }
          }
        }

        &: nth-of-type(3) {
          display: flex;
          @media ${DEVICE.laptop} {
            width: calc(40% - 1rem);
            .inner {
              padding: ${25 / 16}rem ${20 / 16}rem;
              .price {
                margin-bottom: 0;
              }
            }
          }
        }

        .inner .actions .clickable {
          font-size: ${12 / 16}rem;
          font-weight: 400;
          margin-bottom: 0;
          @media ${DEVICE.laptop} {
            padding: ${5 / 16}rem ${8 / 16}rem;
          }
        }
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

  img {
    pointer-events: none;
  }
`
