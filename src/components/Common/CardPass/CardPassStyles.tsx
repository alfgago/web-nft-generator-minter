import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CardPassStyles = styled.div`
  position: relative;
  display: flex;
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

  .more,
  img {
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

  .inner {
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
`
