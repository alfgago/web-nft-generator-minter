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
    right: 0;
    top: 0;
    transform: translateY(-35%);

    svg {
      width: ${436 / 16}rem;
      height: ${436 / 16}rem;
    }
  }
`
