import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const NftCardStyles = styled.div`
  .lazyload-wrapper {
    position: relative;
    width: 100%;
    background: ${COLORS.white};
    box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;

    .inner {
      width: 100%;
      padding: 10px 10px;
      color: #000;

      @media ${DEVICE.laptop} {
        padding: ${25 / 16}rem ${20 / 16}rem;
      }

      .title {
        font-size: ${16 / 16}rem;
        font-weight: 600;
        margin-bottom: 1rem;
        @media ${DEVICE.laptop} {
          font-size: ${16 / 16}rem;
        }
      }
      .price {
        color: #999;
        font-size: ${14 / 16}rem;
        font-weight: 400;
        @media ${DEVICE.laptop} {
          font-size: ${15 / 16}rem;
        }

        b {
          font-size: ${12 / 16}rem;
        }

        span {
          display: block;
        }
      }

      .info {
        display: block;
        width: 100%;
        position: relative;
      }

      .clickable {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: ${14 / 16}rem;
        padding: ${5 / 16}rem ${14 / 16}rem;
      }
    }

    .image-container {
      position: relative;
      height: 0;
      width: 100%;
      padding-bottom: 100%;
      background: #eee;
      img {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .clickable {
      border: 0;
      .spinner {
        width: 50px;
      }
    }
  }
`
