import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const ShowMyNftStyles = styled.section`
  background-color: transparent;
  padding-top: 0;
  padding-bottom: ${49 / 16}rem;
  margin-top: -4.1rem;

  @media ${DEVICE.laptop} {
    margin-top: -5.5rem;
    max-width: 100%;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 43.75rem;
    width: 100%;
    flex-direction: column;

    @media ${DEVICE.laptop} {
      max-width: 100%;
    }
  }

  .content {
    display: flex;
    justify-content: center;
  }

  .items-cont {
    display: flex;
    gap: ${20 / 16}rem;
    @media ${DEVICE.laptop} {
      gap: ${129 / 16}rem;
    }
  }

  .previous,
  .next {
    display: none;
  }
`
