import { DEVICE } from "@/styles/variables"
import styled from "styled-components"

export const TeamCardStyles = styled.div`
  @media ${DEVICE.laptop} {
    width: calc((97% - ${33 / 16}rem) / 3);
  }
  img {
    width: 100%;
    height: 100%;
    max-width: ${449 / 16}rem;
    @media ${DEVICE.laptop} {
      height: 26rem;
    }
  }

  p {
    font-weight: bold;
  }
  padding-bottom: ${50 / 16}rem;
`
