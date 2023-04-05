import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CardPassStyles = styled.div`
  position: relative;

  .flex {
    display: flex;
    position: relative;
    width: 100%;
    background: ${COLORS.white};
    box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);
    margin-top: 0.5rem;
    max-width: 43.75rem;

    @media ${DEVICE.laptop} {
      max-width: 100%;
      width: 100%;
      height: ${250 / 16}rem;
      margin: auto;
    }
  }

  .descriptor-box {
    display: flex;
    margin-top: 1rem;
    font-size: 0.8rem;

    @media ${DEVICE.laptop} {
      font-size: 1.2rem;
    }
    a {
      text-decoration: underline;
    }
    .left {
      max-width: 60%;
      padding-right: 2rem;

      @media ${DEVICE.laptop} {
        max-width: ${560 / 16}rem;
      }
    }

    .perks {
      text-align: left;
      .perks-title {
        font-size: 0.8rem;
        margin: 0;
        font-weight: bold;
        @media ${DEVICE.laptop} {
          font-size: 1rem;
        }
      }
      .icons {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
        justify-content: left;
        @media ${DEVICE.laptop} {
          justify-content: center;
        }
        .icon {
          width: 25px;
          height: 25px;
          border: 1px solid #000;
          padding: 4px;
          border-radius: 50%;
          margin-right: 10px;
          margin-bottom: 10px;
          @media ${DEVICE.laptop} {
            width: 2rem;
            height: 2rem;
            padding: 5px;
          }
          svg {
            width: 100%;
            height: 100%;
          }

          &:hover {
            cursor: pointer;
            background: #111;
            svg {
              path {
                fill: #fff;
              }
            }
          }
        }
        .spotify {
          border: 0;
          padding: 0;
          path {
            fill: none !important;
            stroke: #000;
          }
          &:hover {
            path {
              stroke: #fff;
            }
          }
        }
        .text {
          width: auto;
          white-space: nowrap;
          left: -1rem;
          top: 2.75rem;
        }
      }
    }
  }

  .size {
    display: none;
  }

  .more,
  .pic {
    position: relative;
    width: 40%;
    object-fit: cover;

    @media ${DEVICE.maxlaptop} {
      height: auto;
      &.more {
        position: absolute;
        width: 40px;
        height: 40px;
        bottom: 20px;
        right: 15px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50px;
        }
      }
    }

    @media ${DEVICE.laptop} {
      width: ${250 / 16}rem;
      height: ${250 / 16}rem;
      min-width: ${250 / 16}rem;
      min-height: ${250 / 16}rem;
    }
  }

  .info {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 1rem;
    color: #fff;
    transition: 0.5s ease all;
    z-index: 2;
    > div {
      margin-bottom: 0.5rem;
      b {
        display: block;
      }
    }
    @media ${DEVICE.maxlaptop} {
      display: none;
    }
  }

  &:hover .info {
    opacity: 1;
  }

  .inner-card {
    width: 60%;
    display: flex;
    padding: 20px 15px;
    flex-direction: column;
    justify-content: space-between;
    @media ${DEVICE.laptop} {
      padding: ${25 / 16}rem ${20 / 16}rem;
      min-width: ${300 / 16}rem;
      max-width: ${300 / 16}rem;
    }
    .titles {
      font-size: ${18 / 16}rem;
      line-height: 1.1;
      font-weight: bold;
      @media ${DEVICE.laptop} {
        font-size: ${22 / 16}rem;
      }

      .date {
        color: #333;
        font-size: ${16 / 16}rem;
        font-weight: 400;
        @media ${DEVICE.laptop} {
          font-size: ${18 / 16}rem;
        }
      }
    }
    .descriptor {
      font-size: ${11 / 16}rem;
      margin: 0;
      padding: 0;
      @media ${DEVICE.laptop} {
        font-size: ${13 / 16}rem;
      }
      > div {
        margin-bottom: 0.5rem;
        padding: 0;
      }
    }

    .actions {
      margin-left: auto;
      display: flex;
      gap: 3px;
    }
  }

  .guests-no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .golden-preview {
    width: 280px;
    height: 280px;
    transform-origin: top left;
    transform: scale(0.142);

    @media ${DEVICE.laptop} {
      width: 100%;
      height: 100%;
      transform: none;
    }
    .golden {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 16px;
      .inner {
        width: 100%;
        height: 100%;
        .text {
          font-size: 11px;
          padding: 11px 8px;
        }

        .qr {
          bottom: 8px !important;
        }
      }
    }
  }
`
