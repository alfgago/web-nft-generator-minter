import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LotteryWinnersStyles = styled.section`
  position: relative;
  background: ${COLORS.white};

  background: linear-gradient(-256.8deg, #c1dce4 15.02%, #ffffff 55.64%);

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url("/assets/img/watermark3.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right top;
    pointer-events: none;
    opacity: 1;
  }

  h2 {
    max-width: ${940 / 16}rem;
    margin-bottom: ${50 / 16}rem;
  }
`

export const DropRow = styled.div`
  display: flex;
  width: 100%;
  font-size: ${22 / 16}rem;
  margin-bottom: ${35 / 16}rem;
  background: #e1fdfd;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding-right: ${32 / 16}rem;

  &.pink {
    background: #ffd1fb;
  }

  .place {
    display: flex;
    font-weight: 400;
    align-items: center;
    justify-content: center;
    width: ${226 / 16}rem;
    background: #000;
    color: ${COLORS.white};
    padding: ${20 / 16}rem;
  }

  .date {
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    padding: ${20 / 16}rem ${30 / 16}rem;
  }

  .name {
    display: flex;
    align-items: center;
    margin-left: ${20 / 16}rem;
    width: ${344 / 16}rem;
    background: #4f4f4f;
    color: #fff;
    font-weight: 400;
    padding: 0 ${30 / 16}rem;
  }

  .image {
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .winner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 ${20 / 16}rem;
    font-size: ${19 / 16}rem;
    font-weight: 600;

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
    width: ${273 / 16}rem;
    margin-left: ${10 / 16}rem;
    background: #f2f2f2;
    font-size: ${19 / 16}rem;
    font-weight: 600;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    justify-content: space-around;
    padding: ${20 / 16}rem;
    margin-left: auto;

    button {
      width: 100%;
      border: none;
      font-size: ${16 / 16}rem;
      line-height: ${19 / 16}rem;
      padding: ${10 / 16}rem ${34 / 16}rem;
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
