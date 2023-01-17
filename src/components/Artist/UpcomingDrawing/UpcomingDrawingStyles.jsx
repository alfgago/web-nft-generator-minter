import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDrawingStyles = styled.section`
  background: ${COLORS.white};
  padding-top: 0;

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
  display: flex;
  align-items: center;
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
  max-width: 43.75rem;
  @media ${DEVICE.laptop} {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cols-cont {
    width: 100%;

    @media ${DEVICE.laptop} {
      width: 50%;
      flex-direction: row;
      width: revert;
      display: flex;
    }
  }
  .column1 {
    width: 100%;
    display: flex;
    font-weight: 400;
    justify-content: center;
    font-weight: 600;
    font-size: ${33 / 16}rem;
    background: transparent;
    flex-direction: column;

    @media ${DEVICE.laptop} {
      flex-direction: row;
    }

    .img-container {
      max-width: ${194 / 16}rem;
      width: 50%;
      padding: ${11 / 16}rem 0 ${11 / 16}rem ${22 / 16}rem;
      @media ${DEVICE.laptop} {
        width: 100%;
        max-width: ${260 / 16}rem;
        padding: 0;
      }

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .info {
      padding: ${15 / 16}rem ${8 / 16}rem ${15 / 16}rem ${23 / 16}rem;
      display: flex;
      flex-direction: column;
      width: 100%;

      @media ${DEVICE.laptop} {
        width: revert;
        justify-content: space-between;
        padding: ${40 / 16}rem;
        width: revert;
      }
      h3 {
        font-weight: 600;
        font-size: ${20 / 16}rem;
        padding: 0;
        margin: 0;
        @media ${DEVICE.laptop} {
          font-size: ${33 / 16}rem;
        }
      }
      p {
        padding: 0;
        margin: 0;
        font-weight: 600;
        font-size: ${14 / 16}rem;
        @media ${DEVICE.laptop} {
          white-space: nowrap;
          font-size: ${24 / 16}rem;
        }
      }
    }
  }
  .column2 {
    margin: 0 ${22 / 16}rem;
    border-top: solid 2px #000;
    font-weight: 600;
    font-weight: 600;
    font-size: ${14 / 16}rem;
    justify-content: space-between;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    padding-top: ${15 / 16}rem;
    @media ${DEVICE.laptop} {
      border-top: none;
      border-left: solid 2px #000;
      padding: 0 ${40 / 16}rem;
      margin-top: ${40 / 16}rem;
      margin-bottom: ${40 / 16}rem;
      font-size: ${32 / 16}rem;
    }

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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 14px 22px;
    justify-content: space-between;
    flex-direction: column;
    gap: 5px;

    @media ${DEVICE.laptop} {
      gap: 0px;
      width: ${243 / 16}rem;
      text-align: center;
      align-items: center;
      padding: ${40 / 16}rem ${25 / 16}rem ${40 / 16}rem 0rem;
    }

    div {
      font-size: ${12 / 16}rem;
    }

    span {
      font-size: ${16 / 16}rem;
      font-weight: 500;
      @media ${DEVICE.laptop} {
        font-size: ${20 / 16}rem;
      }
    }
    p {
      padding: 0;
      margin: 0;
      font-size: ${20 / 16}rem;
      font-weight: 600;
      @media ${DEVICE.laptop} {
        font-size: ${33 / 16}rem;
      }
    }

    .btn-fill {
      justify-content: center;
      max-width: 141px;
      white-space: normal;
      /* font-size: ${12 / 16}rem; */
      @media ${DEVICE.laptop} {
        max-width: revert;
      }
    }
    button {
      max-width: ${200 / 16}rem;
      width: 100%;
      height: ${56 / 16}rem;
      border: none;
      font-size: ${12 / 16}rem;
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

      @media ${DEVICE.laptop} {
        font-size: ${17 / 16}rem;
        max-width: 100%;
      }
    }
    .variant {
      background: #c2c2c2;
    }
  }

  .column2-mob {
    @media ${DEVICE.laptop} {
      display: none;
    }
  }

  .main-cont {
    display: flex;

    @media ${DEVICE.laptop} {
      width: 50%;
    }
  }
`
