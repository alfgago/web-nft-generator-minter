import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CardPassStyles = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background: ${COLORS.white};
  box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);
  margin-top: 0.5rem;

  @media ${DEVICE.laptop} {
    width: 100%;
    height: ${250 / 16}rem;
    margin: auto;
  }

  img {
    width: 40%;
    object-fit: cover;

    @media ${DEVICE.maxlaptop} {
      &.artist-pic {
        position: absolute;
        width: 40px;
        height: 40px;
        bottom: 20px;
        right: 15px;
        border-radius: 50px;
      }
    }

    @media ${DEVICE.laptop} {
      width: ${250 / 16}rem;
      height: ${250 / 16}rem;
    }
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
    }
    .titles {
      font-size: ${22 / 16}rem;
      line-height: 1.1;
      font-weight: bold;
      @media ${DEVICE.laptop} {
        font-size: ${25 / 16}rem;
      }

      .date {
        color: #333;
        font-size: ${18 / 16}rem;
        font-weight: 400;
        @media ${DEVICE.laptop} {
          font-size: ${20 / 16}rem;
        }
      }
    }
    .descriptor {
      font-size: ${18 / 16}rem;
      margin: 0;
      padding: 0;
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
`
