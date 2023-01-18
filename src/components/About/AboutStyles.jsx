import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const AboutStyles = styled.main`
  .cont {
    display: flex;
    .cont-desc {
      width: 100%;
      max-width: ${850 / 16}rem;
    }

    .cont-stars {
      display: flex;
      align-items: center;
      width: 100%;
      span {
        text-align: center;
        width: 100%;
      }
    }
  }

  .simple-header {
    padding-bottom: ${100 / 16}rem;

    .white-star {
      position: absolute;
      right: ${50 / 16}rem;
      top: -3%;
      svg {
        max-width: ${400 / 16}rem;
      }
    }
  }
`
