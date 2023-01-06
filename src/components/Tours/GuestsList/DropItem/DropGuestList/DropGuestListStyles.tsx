import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const DropGuestListStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: ${10 / 16}rem ${0 / 16}rem;

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

  .container + span input {
    width: ${24 / 16}rem;
    height: ${24 / 16}rem;
    border-radius: ${6 / 16}rem;
    padding: ${10 / 16}rem;
    border: ${3 / 16}rem solid #777777;
    :checked {
      background-image: url("/assets/icons/grey-check.svg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`
