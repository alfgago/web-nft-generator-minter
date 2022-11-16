import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

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
      padding: ${5 / 16}rem ${30 / 16}rem;

      div {
        display: flex;
        justify-content: space-between;
      }
    }

    input {
      width: ${32 / 16}rem;
      height: ${32 / 16}rem;
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
        padding: ${10 / 16}rem 0px;
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
