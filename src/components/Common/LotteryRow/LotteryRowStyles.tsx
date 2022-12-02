import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LotteryRowStyles = styled.div`
  display: flex;
  width: 100%;
  font-size: ${14 / 16}rem;
  margin-bottom: ${35 / 16}rem;
  background: #e1fdfd;

  @media ${DEVICE.laptop} {
    font-size: ${22 / 16}rem;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    padding-right: ${32 / 16}rem;
  }

  &.pink {
    background: #ffd1fb;
  }

  .image {
    position: relative;
    height: 0;
    width: 30%;
    padding-bottom: 30%;
    img {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media ${DEVICE.laptop} {
      height: ${110 / 16}rem;
      width: ${110 / 16}rem;
      padding: 0;
    }
  }

  .inner-content {
    display: flex;
    width: 70%;
    flex-wrap: wrap;

    @media ${DEVICE.laptop} {
      width: 100%;
      flex-wrap: initial;
    }

    .place {
      display: flex;
      font-weight: 400;
      align-items: center;
      justify-content: center;
      background: #000;
      color: ${COLORS.white};
      width: 50%;
      padding: 5px 10px;

      @media ${DEVICE.laptop} {
        width: ${226 / 16}rem;
        padding: ${20 / 16}rem;
      }
    }

    .date {
      display: flex;
      font-weight: 600;
      align-items: center;
      justify-content: center;
      width: 50%;
      padding: 5px 10px;

      @media ${DEVICE.laptop} {
        width: auto;
        padding: ${20 / 16}rem ${30 / 16}rem;
      }
    }

    .name {
      display: flex;
      align-items: center;
      background: #4f4f4f;
      color: #fff;
      font-weight: 400;
      width: 50%;
      padding: 5px 10px;

      @media ${DEVICE.laptop} {
        padding: 0 ${30 / 16}rem;
        width: ${344 / 16}rem;
      }
    }

    .winner {
      display: none;
      justify-content: center;
      flex-direction: column;
      font-weight: 600;
      width: 50%;
      padding: 5px 10px;

      @media ${DEVICE.laptop} {
        display: flex;
        width: ${250 / 16}rem;
        padding: 0 ${20 / 16}rem;
        font-size: ${19 / 16}rem;
      }

      span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      small {
        position: absolute;
        transform: translateY(-${16 / 16}rem);
        font-weight: 300;
        display: block;
        font-size: ${11 / 16}rem;
        text-transform: uppercase;
      }
    }

    .time {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f2f2f2;
      font-weight: 600;

      @media ${DEVICE.laptop} {
        font-size: ${19 / 16}rem;
        margin-left: ${10 / 16}rem;
        width: ${273 / 16}rem;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      justify-content: space-around;
      width: 50%;
      padding: 5px 10px;

      @media ${DEVICE.laptop} {
        margin-left: auto;
        width: auto;
        padding: ${20 / 16}rem;
      }
    }
  }
`
