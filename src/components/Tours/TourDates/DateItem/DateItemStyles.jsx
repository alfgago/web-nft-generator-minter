import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

const fontSize = "1rem"

export const DateItemStyles = styled.div`
  padding: 10px 0px;
  p {
    font-size: 1rem !important;
  }

  .card-container {
    background-color: ${COLORS.white};
    width: 100%;
    border-radius: 0px 0px 12px 12px;

    .card-content {
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

      button {
        display: flex;
        justify-content: center;
        border: none;
        padding: 10px 0px;
        color: ${COLORS.white};

        div {
          padding-right: 5px;
        }
      }

      .cancel-btn {
        flex-basis: 50%;
        border-radius: 0px 0px 0px 12px;
        background-color: #616161;
      }
      .confirm-btn {
        flex-basis: 50%;
        border-radius: 0px 0px 12px 0px;
        background-color: #005bc8;
      }
    }
  }
`
