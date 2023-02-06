import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistListingStyles = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 4rem;

  .simple-header {
    padding-bottom: 4.5rem;
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
        height: 100vh;
        width: 100vw;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(216, 245, 254, 1) 60%
        );
        @media ${DEVICE.laptop} {
          height: 100%;
          background: linear-gradient(
            149deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(216, 245, 254, 1) 60%
          );
        }
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
      position: relative;
      margin-top: -3.5rem;
      width: 100%;
      @media ${DEVICE.laptop} {
        position: absolute;
        top: 0;
        margin-top: 0;
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
      display: inline-block;
      font-weight: bold;
      font-size: ${25 / 16}rem;
      margin-right: ${30 / 16}rem;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        padding-left: 12rem;
        margin-left: auto;
        margin-bottom: 0;
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
      background: transparent;
      font-weight: 500;
    }
  }

  section {
    padding: 2rem 0;
  }
`
export const ListingStyles = styled.section`
  position: relative;
  padding: 2rem 0;

  .content {
    justify-content: center;
    align-items: center;
  }

  .loading,
  .loadmore {
    text-align: center;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 43.75rem;
    width: 100%;

    @media ${DEVICE.laptop} {
      max-width: 100%;
    }

    .drop-card {
      width: 100%;
      margin-bottom: 0;
      @media ${DEVICE.laptop} {
        width: calc(50% - 1rem);
      }

      .inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }
`
