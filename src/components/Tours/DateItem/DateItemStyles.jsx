import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const DateItemStyles = styled.div`
  p {
    font-size: 1rem !important;
  }

  .card-container {
    position: relative;
    background-color: ${COLORS.white};
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
    height: 100%;
    display: flex;

    img {
      width: ${90 / 16}rem;
      height: ${120 / 16}rem;
      min-width: ${90 / 16}rem;
      min-height: ${120 / 16}rem;
      padding: ${10 / 16}rem;
      object-fit: contain;
    }

    .card-content {
      padding: ${15 / 16}rem ${20 / 16}rem;

      h4 {
        font-size: ${22 / 16}rem;
      }

      .address {
        font-size: ${16 / 16}rem;
        font-weight: 500;
        padding-bottom: 1rem;
      }

      > div {
        display: flex;
        justify-content: space-between;
      }

      p + label {
        margin-top: ${10 / 16}rem;
      }
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
  .edit {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    cursor: pointer;
  }
`
