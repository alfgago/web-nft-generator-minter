import { COLORS } from "@/styles/variables"
import styled from "styled-components"
export const GuestsDropMenuStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${10 / 16}rem ${0 / 16}rem ${20 / 16}rem ${0 / 16}rem;
  gap: ${27 / 16}rem;

  align-items: center;

  .drop-container {
    border: ${1 / 16}rem solid ${COLORS.black};
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 40rem;
    flex-wrap: wrap;

    .unc-content {
      width: 90%;

      button {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }

    .unc-content + div {
      width: 10%;
    }
  }

  .bg-opned {
    background-color: ${COLORS.white};
  }
`

export const GuestDropItemStyles = styled.div``
