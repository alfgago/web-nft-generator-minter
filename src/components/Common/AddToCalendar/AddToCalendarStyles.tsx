import styled from "styled-components"

import { DEVICE } from "@/styles/variables"

export const AddToCalendarStyles = styled.div`
  position: relative;
  .hidden {
    display: none;
  }

  .atcb-button-wrapper {
    padding: 0;
  }
  .atcb-button {
    font-size: 0.75rem;
    padding: 0.3125rem 0.5rem;
    margin: 0;
    min-width: 0;
    color: rgb(255, 255, 255);
    background: rgb(20, 21, 255);
    border: 2px solid rgb(20, 21, 255);
    border-radius: 50px;
    transition: all 0.5s ease 0s;
    box-shadow: none;

    @media ${DEVICE.maxlaptop} {
      font-size: ${11 / 16}rem;
      padding: 3px 5px;
    }
    &.atcb-active {
      background-color: transparent !important;
      border-color: rgb(20, 21, 255);
      .atcb-text,
      .atcb-icon {
        color: rgb(20, 21, 255);
      }
    }
    @media ${DEVICE.laptop} {
      &:hover {
        color: #fff;
        background: none;
        border-color: #fff;
      }
      &.atcb-active {
        background-color: transparent !important;
        border-color: #fff;
        .atcb-text,
        .atcb-icon {
          color: #fff;
        }
      }
    }
  }
`
