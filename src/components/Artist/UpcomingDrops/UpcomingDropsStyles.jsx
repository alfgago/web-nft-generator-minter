import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDropsStyles = styled.section`
  background: ${COLORS.white};

  h2 {
    margin-bottom: ${40 / 16}rem;
  }

  @media ${DEVICE.laptop} {
    padding-top: 8rem;
  }
`
export const BoxDrops = styled.div`
  flex-direction: column;
  @media ${DEVICE.laptop} {
    display: flex;
  }
`
export const DropRow = styled.div`
  display: flex;
  width: 100%;
  font-size: ${22 / 16}rem;
  margin-bottom: ${35 / 16}rem;
  .place {
    display: flex;
    font-weight: 400;
    align-items: center;
    justify-content: center;
    width: ${226 / 16}rem;
    background: #000;
    color: ${COLORS.white};
    padding: ${20 / 16}rem;
    flex-wrap: wrap;
  }
  .date {
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    width: ${155 / 16}rem;
    background: #e1fdfd;
  }
  .collection {
    display: flex;
    align-items: center;
    width: ${344 / 16}rem;
    background: #f2f2f2;
    font-weight: 400;
    .name {
      margin-left: ${20 / 16}rem;
    }
    img {
      height: 100%;
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
    margin-left: ${10 / 16}rem;
    flex-direction: column;
    justify-content: space-around;
    padding: ${5 / 16}rem;
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
