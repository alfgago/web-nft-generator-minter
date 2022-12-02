import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistHeroStyled = styled.section`
  color: ${COLORS.white};
  height: ${720 / 16}rem;
  width: 100%;
  position: relative;
  background: linear-gradient(
    270deg,
    #f1ff97 -0.82%,
    rgba(243, 243, 243, 0.9) 52.7%
  );

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
  image?: string
  overlay?: string
}

export const ArtistImage = styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .waterMarkLogo {
    position: absolute;
    bottom: 36px;
    left: 51px;
    z-index: 3000;
  }

  &:before {
    content: "";
    position: absolute;
    width: 73%;
    height: 100%;
    background: url("${(props) => props.image}") no-repeat;
    background-size: auto 100%;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .overlay {
    &:before {
      content: "";
      position: absolute;
      width: 47%;
      height: 100%;
      background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 45%,
        rgba(0, 0, 0, 0) 100%
      );
      top: 0;
      right: 19%;
      z-index: 2000;

      @media only screen and (max-width: 1540px) {
        right: 22%;
        width: 30%;
      }

      @media only screen and (max-width: 1440px) {
        display: none;
      }
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
      right: 0;
      z-index: 2000;
    }
  }
`
