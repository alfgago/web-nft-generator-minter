import { COLORS } from "@/styles/variables"
import styled from "styled-components"

export const GuestItemStyles = styled.div`
  display: flex;
  padding-bottom: ${10 / 16}rem;

  .container {
    width: 70%;
  }

  .container div {
    width: 100%;
    border-bottom: solid ${2 / 16}rem ${COLORS.white};

    padding: ${10 / 16}rem ${16 / 16}rem;
    p {
      margin: 0;
    }
  }
  .black-header {
    background-color: ${COLORS.black};
    color: ${COLORS.white};
    font-weight: 500;
  }

  .black-header ~ div {
    background: #f5f5f5;
  }

  div > img {
    height: 100%;
    object-fit: cover;
    width: 100%;
    max-width: ${143 / 16}rem;
  }
`
