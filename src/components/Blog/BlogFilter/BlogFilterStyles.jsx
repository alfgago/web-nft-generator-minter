import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const BlogFilterStyles = styled.section`
  padding: 0;

  .triangle-container:before {
    background-color: #0c0c0c;
  }

  .active {
    span {
      background-color: #a0a0a0;
    }
  }
`

export const FilterStyles = styled.div`
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
        background: #0c0c0c;
      }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        height: 100vh;
        width: 100vw;
        background: #0c0c0c;

        @media ${DEVICE.laptop} {
          height: 100%;
          background: #0c0c0c;
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
          background: #0c0c0c;
          height: 57.5vh;

          @media ${DEVICE.laptop} {
            height: 1.5rem;
          }
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
      color: ${COLORS.white};

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
    color: ${COLORS.white};

    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    li {
      color: ${COLORS.white};
      background: transparent;
      font-weight: 500;
      span {
        color: #fff;
      }
    }
  }

  .clickable:hover {
    background-color: #a0a0a0;
  }

  section {
    padding: 2rem 0;
  }
`
