import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

const fontSize = "1rem"

export const TourDateStyles = styled.div`
  background-color: #0c0c0c;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .bg-container {
    background-color: #0c0c0c;
    padding: 0.2rem 0rem;
    width: 100%;
    height: 100%;
    padding: 3rem 1rem;
  }

  .date-settings {
    color: ${COLORS.white};
    padding: 10px 0px;

    div > span {
      font-size: 20px;
    }

    a {
      padding: 0.75rem 0 !important;
      svg {
        width: 3.5rem;
        height: 3.5rem;
      }
    }

    > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`
