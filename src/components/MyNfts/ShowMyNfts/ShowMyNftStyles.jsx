import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const ShowMyNftStyles = styled.section`
  background-color: transparent;
  padding-top: 0;
  padding-bottom: ${49 / 16}rem;
  margin-top: -5.5rem;

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 43.75rem;
    width: 100%;

    @media ${DEVICE.laptop} {
      max-width: 100%;
    }
  }
`
