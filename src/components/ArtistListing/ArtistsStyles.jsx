import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistsStyles = styled.div`
  position: relative;
  width: 100%;
`

export const HeroStyles = styled.section`
  background: rgb(13, 21, 228);
  background: linear-gradient(
    119deg,
    rgba(13, 21, 228, 1) 0%,
    rgba(0, 150, 255, 1) 58%,
    rgba(254, 0, 253, 1) 100%
  );

  h1 {
    color: #fff;
  }

  .featured {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 5rem 0 2rem 0;

    h1 {
      position: absolute;
      bottom: 2rem;
      margin-left: ${553 / 16}rem;
      padding-left: ${100 / 16}rem;
      font-size: ${64 / 16}rem;
      line-height: 1;
    }

    .artist {
      width: ${215 / 16}rem;
      margin-left: ${100 / 16}rem;

      .link {
        display: block;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      }

      .img-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .name {
        background: #000;
        color: #fff;
        font-size: ${18 / 16}rem;
        padding: 0.5em 1em;
      }

      &:first-of-type {
        width: ${553 / 16}rem;
        margin-left: 0;

        .name {
          font-size: ${30 / 16}rem;
        }

        .img-container {
          padding-bottom: ${359 / 16}rem;
        }
      }
    }
  }
`

export const BrowseStyles = styled.div`
  position: relative;
  margin-top: -4.5rem;
  overflow: hidden;

  .top-triangle {
    padding: 0;

    .triangle-container {
      position: relative;
      display: inline-block;
      height: 6rem;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 100%;
        width: 800px;
        height: 100%;
        background: #fff;
      }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        width: 100vw;
        height: 100%;
        background: linear-gradient(
          149deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(216, 245, 254, 1) 60%
        );
      }
      .img-span {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 100%;
          right: 0;
          width: 100vw;
          height: 1.5rem;
          background: #fff;
        }
      }
      img {
        display: block;
        position: relative;
        height: 4.5rem;
        object-fit: cover;
      }
    }
  }

  .filter-section {
    .abs {
      width: 100%;
      @media ${DEVICE.laptop} {
        position: absolute;
        top: 0;
        z-index: 3;
      }
    }

    .content {
      position: relative;
      @media ${DEVICE.laptop} {
        min-height: 6rem;
        display: flex;
        align-items: center;
      }
    }

    .title {
      font-weight: bold;
      font-size: ${25 / 16}rem;
      margin-right: ${30 / 16}rem;
      @media ${DEVICE.laptop} {
        padding-left: 12rem;
        margin-left: auto;
      }
    }
    @media ${DEVICE.laptop} {
      padding: 0;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    li {
      padding: ${14 / 16}rem ${25 / 16}rem;
      background: transparent;
      border: ${1 / 16}rem solid #454545;
      border-radius: 50px;
      font-weight: 500;
      cursor: pointer;
      transition: 0.5s ease all;

      &.active {
        color: ${COLORS.white};
        background: #373737;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`
export const ListingStyles = styled.section`
  position: relative;
`
