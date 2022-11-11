import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const DropGuestListStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0px;

  .btns-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: ${15 / 16}rem;

    @media (${DEVICE.maxmobile}) {
      span {
        padding: 0.625rem 0.875rem;
      }

      button {
        padding: ${0 / 16}rem ${4 / 16}rem;
      }
    }
  }

  .container + input {
    width: ${24 / 16}rem;
    height: ${24 / 16}rem;
    border-radius: ${6 / 16}rem;
    padding: ${10 / 16}rem;
    border: ${4 / 16}rem solid #777777;
    :checked {
      background-color: #777777;
    }
    .checkmark:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      background-color: #2196f3;
    }
  }
`
