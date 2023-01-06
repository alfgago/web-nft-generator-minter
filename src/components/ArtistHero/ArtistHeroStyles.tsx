import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistHeroStyled = styled.section`
  color: ${COLORS.white};
  height: auto;
  width: 100%;
  position: relative;
  background: linear-gradient(
    270deg,
    #f1ff97 -0.82%,
    rgba(243, 243, 243, 0.9) 52.7%
  );

  @media ${DEVICE.laptop} {
    height: ${720 / 16}rem;
  }

  .content {
    position: relative;
    height: 100%;
    z-index: 4000;
    display: flex;
    align-items: center;
  }

  .artist-info {
    margin-left: auto;
    max-width: ${345 / 16}rem;
    text-align: right;

    h1 {
      font-size: ${46 / 16}rem;
    }

    .name {
      font-size: ${30 / 16}rem;
    }

    .bio {
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: ${16 / 16}rem;
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
    bottom: 36px;
    left: 51px;
    z-index: 4;
  }

  .background-image {
    position: relative;
    display: inline-block;
    height: 100%;
    z-index: 2;
    img {
      width: auto;
      height: 100%;
      max-width: 100vw;
      top: 0;
      left: 0;
      z-index: 2;
      object-fit: cover;
    }
    &:before {
      content: "";
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
      z-index: 1;
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      );
    }
  }

  .overlay {
    position: relative;
    width: 100%;
    height: @media ${DEVICE.laptop} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
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
