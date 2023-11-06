import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UserSignUpStyles = styled.div`
  .buttons {
    display: flex;
    gap: 30px;
  }

  .signup-form.in-popup .success {
    display: flex;
    gap: 1rem;
    font-size: 2rem;
    svg {
      width: 2rem;
      height: 2rem;
      polyline,
      path {
        stroke: green;
      }
    }
  }
`
