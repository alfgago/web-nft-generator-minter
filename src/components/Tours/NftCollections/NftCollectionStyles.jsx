import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const NftCollectionStyles = styled.section`
  position: relative;
  padding-top: ${40 / 16}rem;
  padding-bottom: ${40 / 16}rem;

  .header-collection {
    padding-bottom: 20px;
    h1 {
      max-width: 21rem;
    }
  }

  .star {
    position: absolute;
    right: ${0 / 16}rem;
    top: -45px;
    transform: translateY(-35%);

    @media (${DEVICE.laptop}) {
      right: -107px;
      top: -20px;
    }

    svg {
      width: ${112 / 16}rem;
      height: ${436 / 16}rem;

      @media (${DEVICE.laptop}) {
        width: ${380 / 16}rem;
        height: ${436 / 16}rem;
      }
    }
  }
`
