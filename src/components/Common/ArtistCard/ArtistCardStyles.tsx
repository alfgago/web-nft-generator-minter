import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistCardStyles = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background: ${COLORS.white};
  box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  flex-direction: column;

  @media ${DEVICE.laptop} {
    &.home {
      .image-container {
        width: 100%;
        padding-bottom: 100%;
      }
      .inner {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        background: #000;
        color: #fff;
        display: flex;
        align-items: center;

        .titles {
          width: 80%;
          padding-right: ${10 / 16}rem;
        }
        .actions {
          display: block;
          text-align: center;
          .time {
            color: #fff;
            margin-top: 0.5rem;
          }
        }
      }
    }
    flex-direction: row;
  }

  .image-container {
    position: relative;
    height: 0;
    width: 100%;
    padding-bottom: 50%;

    @media ${DEVICE.laptop} {
      width: 50%;
    }

    img {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media ${DEVICE.laptop} {
      width: 50%;
      padding-bottom: 50%;
    }

    .socials {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
      padding: 1rem;
      display: flex;
      gap: 5px;

      svg {
        width: ${27 / 16}rem;
        height: ${27 / 16}rem;
        margin-top: ${5 / 16}rem;
        filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4));
        path {
          transition: 0.5s ease all;
          opacity: 1;
        }
      }

      a:hover svg path {
        cursor: pointer;
        transform: scale(1.05);
      }
      @media ${DEVICE.laptop} {
        display: revert;
        gap: revert;
      }
    }
  }

  .inner {
    width: 100%;
    padding: 20px 15px;
    color: #000;

    @media ${DEVICE.laptop} {
      width: 50%;
      padding: ${25 / 16}rem ${20 / 16}rem;
    }

    .title {
      font-size: ${20 / 16}rem;
      font-weight: 600;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${20 / 16}rem;
      }
    }

    .type {
      font-size: ${14 / 16}rem;
      font-weight: 500;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${18 / 16}rem;
      }
    }

    .passes {
      font-size: ${18 / 16}rem;
      font-weight: 400;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${20 / 16}rem;
      }
    }

    .actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 10px;

      .time {
        display: block;
        font-size: ${12 / 16}rem;
        color: #000;
      }
    }
  }
`
