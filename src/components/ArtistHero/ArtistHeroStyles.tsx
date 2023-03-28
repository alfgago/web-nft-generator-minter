import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistHeroStyled = styled.section`
  color: ${COLORS.white};
  height: 70vh;
  width: 100%;
  position: relative;
  padding-bottom: 1rem;
  background: linear-gradient(
    270deg,
    #f1ff97 -0.82%,
    rgba(243, 243, 243, 0.9) 52.7%
  );

  @media ${DEVICE.laptop} {
    height: ${720 / 16}rem;
    min-height: none;
    padding-bottom: 4rem;
  }

  .content {
    position: relative;
    height: 100%;
    z-index: 4000;
    display: flex;
    align-items: flex-end;

    @media ${DEVICE.laptop} {
      align-items: center;
    }
  }

  .artist-info {
    margin-left: auto;
    max-width: 100%;
    text-align: right;

    @media ${DEVICE.laptop} {
      width: 100%;
      max-width: ${450 / 16}rem;
    }

    .name {
      font-size: ${30 / 16}rem;
    }

    .bio {
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: ${16 / 16}rem;

      @media ${DEVICE.laptop} {
        font-size: ${18 / 16}rem;
      }
    }

    .socials {
      display: flex;
      text-decoration: none;
      justify-content: end;
      align-items: center;
      gap: 12px;

      li {
        list-style-type: none;
      }
    }

    .genre {
      font-size: ${30 / 16}rem;
    }
  }
`
export interface Props {
  overlay?: string
}

export const ArtistImage = styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .watermark-logo {
    position: absolute;
    display: none;
    bottom: 4rem;
    left: 3rem;
    z-index: 4;
    max-height: 11rem;

    @media ${DEVICE.laptop} {
      display: block;
    }
  }

  .background-image {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100%;
    z-index: 2;
    pointer-events: none;

    @media ${DEVICE.laptop} {
      display: inline-block;
      width: auto;
    }

    img {
      width: 100%;
      height: 100%;
      max-width: 100vw;
      top: 0;
      left: 0;
      z-index: 2;
      object-fit: cover;

      @media ${DEVICE.laptop} {
        width: auto;
      }
    }
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      z-index: 1;
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      );

      @media ${DEVICE.laptop} {
        width: 50%;
      }
    }
  }

  .image-overlay {
    display: none;
    transform: none !important;

    @media ${DEVICE.laptop} {
      display: block;
    }

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #000;
      top: 0;
      right: 25rem;
      z-index: 1;
    }
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("${(props) => props.overlay}") no-repeat;
      background-size: auto 100%;
      background-position: right;
      top: 0;
      left: 0;
      z-index: 3;
    }
  }
`
