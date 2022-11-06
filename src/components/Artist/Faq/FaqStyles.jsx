import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const FaqStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  background: linear-gradient(
    270deg,
    #d8f5fe 10%,
    rgba(255, 255, 255, 0.9) 100%
  );

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h2 {
      margin-bottom: 2.5rem;
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
