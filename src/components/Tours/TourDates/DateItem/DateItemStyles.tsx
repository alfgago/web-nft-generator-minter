import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

const fontSize = "1rem"

export const DateItemStyles = styled.div`
  padding: 10px 0px;

  .card-container {
    background-color: ${COLORS.white};
    width: 100%;
    border-radius: 0px 0px 12px 12px;

    div:first-child {
      padding: 5px 30px;
    }

    input {
      right: 60px;
      position: absolute;
      width: 2rem;
      height: 2rem;
      border: #777777 solid 2px;
    }
    .btns-container {
      display: flex;
      flex-wrap: wrap;
      text-align: center;

      a {
        flex-basis: 50%;
      }
    }
  }
`
