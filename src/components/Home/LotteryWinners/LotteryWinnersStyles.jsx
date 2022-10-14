import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LotteryWinnersStyles = styled.section`
  background: ${COLORS.white};

  h2 {
    font-size: ${64 / 16}rem;
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
    font-weight: 700;
    align-items: center;
    justify-content: center;
    padding: ${20 / 16}rem ${30 / 16}rem;
  }

  .collection {
    display: flex;
    align-items: center;
    width: ${344 / 16}rem;
    background: #4f4f4f;
    color: #fff;
    font-weight: 400;
    .name {
      margin-left: ${20 / 16}rem;
    }
    img {
      height: 100%;
    }
  }

  .winner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: ${20 / 16}rem;
    font-size: ${19 / 16}rem;
    font-weight: 700;

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
    font-weight: 700;
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
