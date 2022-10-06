import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistStyles = styled.main`
  position: relative;
  width: 100%;
`

export const FaqStyles = styled.div`
  position: relative;
  width: 100%;
  height: ${557 / 16}rem;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;
  background: #000;

  .faqContainer {
    display: flex;
    flex-direction: column;
    height: ${557 / 16}rem;
    justify-content: space-around;
    max-width: 100vw;
    margin: 0 auto;
    padding: 4rem ${260 / 16}rem;
    background: linear-gradient(
      270deg,
      #d8f5fe 8.41%,
      rgba(255, 255, 255, 0.9) 88.16%
    );

    .title {
      display: flex;
      padding: 0 ${40 / 16}rem;
      margin: 0;
      width: 100%;
      font-weight: 600;
      font-size: ${52 / 16}rem;
      line-height: ${57 / 16}rem;
    }

    .faqBox {
      display: flex;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      font-size: ${25 / 16}rem;
      flex-direction: column;
      .active {
        margin: ${5 / 16}rem ${6 / 16}rem;
        font-weight: 400;
        color: ${COLORS.white};
        padding: ${14 / 16}rem ${25 / 16}rem;
        background: #373737;
        border: 1px solid #454545;
        border-radius: ${69 / 16}rem;
        width: fit-content;
      }
      > li:first-child {
        margin: ${5 / 16}rem ${6 / 16}rem ${5 / 16}rem 0;
      }
      > li:not(.active) {
        font-weight: 400;
        margin: ${5 / 16}rem ${6 / 16}rem;
        padding: ${19 / 16}rem ${25 / 16}rem;
        background: transparent;
        border: 1px solid #454545;
        border-radius: ${36 / 16}rem;
        width: fit-content;
      }
    }

    .answer {
      background: #373737;
      border-radius: ${25 / 16}rem;
      width: ${434 / 16}rem;
      height: ${217 / 16}rem;
      padding: ${30 / 16}rem;
      color: ${COLORS.white};
      margin: ${5 / 16}rem 0 ${5 / 16}rem ${70 / 16}rem;
    }
  }
`
