import styled from "styled-components"
import { COLORS } from "@/styles/variables"

export const GuestsListStyles = styled.section`
  padding-top: 0rem;
  background-color: ${COLORS.white};
  min-height: 30vh;

  .container {
    width: 100%;
  }

  div img {
    width: 100%;
  }

  .drops-container {
    display: flex;
    flex-direction: column;
    padding: ${10 / 16}rem ${0 / 16}rem ${20 / 16}rem ${0 / 16}rem;
    gap: ${27 / 16}rem;

    align-items: center;
  }
`
