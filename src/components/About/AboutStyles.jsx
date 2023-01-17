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
`
