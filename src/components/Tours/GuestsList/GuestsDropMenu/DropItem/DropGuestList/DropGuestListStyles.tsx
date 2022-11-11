import styled from "styled-components"

import { DEVICE } from "@/styles/variables"

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
`
