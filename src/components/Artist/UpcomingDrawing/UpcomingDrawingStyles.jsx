import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDrawingStyles = styled.section`
  background: ${COLORS.white};

  h2 {
    margin-bottom: ${40 / 16}rem;
  }

  @media ${DEVICE.laptop} {
    padding-top: 0;
    padding-bottom: 8rem;
  }
`
export const BoxDrawing = styled.div`
  flex-direction: column;
  @media ${DEVICE.laptop} {
    display: flex;
  }
`
export const DrawRow = styled.div`
  width: 100%;
  font-size: ${24 / 16}rem;
  margin-bottom: ${35 / 16}rem;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.5) 50%,
    rgba(249, 215, 255, 0.5) 95%
  );

  @media ${DEVICE.laptop} {
    display: flex;
    justify-content: space-between;
  }

  .column1 {
    display: flex;
    font-weight: 400;
    justify-content: center;
    font-weight: 600;
    font-size: ${33 / 16}rem;
    background: transparent;

    img {
      height: 100%;
    }

    .info {
      padding: ${40 / 16}rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-weight: 600;
        font-size: ${33 / 16}rem;
        padding: 0;
        margin: 0;
      }
      p {
        padding: 0;
        margin: 0;
        font-weight: 600;
        font-size: ${24 / 16}rem;
        white-space: nowrap;
      }
    }
  }
  .column2 {
    font-weight: 600;
    font-weight: 600;
    font-size: ${32 / 16}rem;
    justify-content: space-between;
    margin-top: ${40 / 16}rem;
    margin-bottom: ${40 / 16}rem;
    padding: 0 ${40 / 16}rem;
    border-left: solid 2px #000;
    .time {
      display: flex;
      width: 100%;
    }
    .place {
      display: flex;
      width: 100%;
    }
    .date {
      display: flex;
      width: 100%;
    }
  }
  .column3 {
    width: ${243 / 16}rem;
    display: flex;
    flex-wrap: wrap;
    padding: ${40 / 16}rem ${25 / 16}rem ${40 / 16}rem 0rem;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    text-align: center;
    span {
      font-size: ${20 / 16}rem;
    }
    p {
      padding: 0;
      margin: 0;
      font-size: ${33 / 16}rem;
      font-weight: 600;
    }
    button {
      width: 100%;
      height: ${56 / 16}rem;
      border: none;
      font-size: ${17 / 16}rem;
      line-height: ${19 / 16}rem;
      padding: ${10 / 16}rem ${10 / 16}rem;
      margin: 0 ${2 / 16}rem;
      color: ${COLORS.white};
      font-weight: 500;
      background: #373737;
      border-radius: ${29 / 16}rem;
      :hover {
        background: #858585;
        cursor: pointer;
      }
    }
    .variant {
      background: #c2c2c2;
    }
  }
`
