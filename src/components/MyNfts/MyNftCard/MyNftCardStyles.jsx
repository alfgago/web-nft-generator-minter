import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const MyNftCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .head-cont {
    background-color: ${COLORS.black};
    padding: ${14 / 16}rem;

    p:first-of-type {
      font-weight: 500;
      padding-bottom: ${2 / 16}rem;
    }

    p {
      margin: 0px;
      color: ${COLORS.white};
    }
  }

  .content-cont {
    background-color: #f3f3f3;
    padding: ${14 / 16}rem;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .info-cont {
      display: flex;
      padding-top: ${15 / 16}rem;
      justify-content: space-between;
      div p {
        font-weight: 600;
        margin: 0px;
      }

      a span {
        padding ${8 / 16}rem ${22 / 16}rem;
      }
    }
  }
`
