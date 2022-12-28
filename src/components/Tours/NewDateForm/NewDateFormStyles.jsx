import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"
export const NewDateFormStyles = styled.div`
  padding-top: ${20 / 16}rem;

  p {
    text-align: center;
    font-weight: 500;
    @media ${DEVICE.laptop} {
      padding-top: ${20 / 16}rem;
    }
  }

  .buttons {
    width: 100%;
    text-align: right;
  }
`
