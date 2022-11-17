import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

const fontSize = "1rem"

export const TourDateStyles = styled.div`
  background-color: #0c0c0c;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .bg-container {
    background-color: #0c0c0c;
    padding: 0.2rem 0rem;
    width: 100%;
    height: 100%;
    padding: 3rem 1rem;
  }

  .tour-dates {
    display: block;

    @media ${DEVICE.laptop} {
      justify-content: center;
      width: 95%;
      display: flex;
      flex-wrap: wrap;
      gap: ${50 / 16}rem;

      > .item {
        width: ${375 / 16}rem;
      }
    }
  }

  .date-settings {
    color: ${COLORS.white};
    padding: 10px 0px;

    @media ${DEVICE.laptop} {
      width: 92%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      font-size: ${30 / 16}rem;
      margin: 0;

      @media ${DEVICE.laptop} {
        font-size: ${40 / 16}rem;
      }
    }

    p + div {
      margin-top: 20px;
      @media ${DEVICE.laptop} {
        margin-top: 0px;
      }
    }

    div > span {
      font-size: 20px;
    }

    a {
      padding: 0.75rem 0 !important;
      position: absolute;
      right: ${32 / 16}rem;
      top: ${34 / 16}rem;
      @media ${DEVICE.laptop} {
        top: ${-30 / 16}rem;
        right: ${55 / 16}rem;
      }

      svg {
        width: ${40 / 16}rem;
        height: ${40 / 16}rem;
      }
    }
  }
`
