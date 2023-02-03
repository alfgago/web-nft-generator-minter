import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const NftBuilderStyles = styled.div`
  position: relative;
  width: 100%;

  .steps {
    padding-top: 3rem;
  }

  .buttons {
    display: flex;
    gap: ${15 / 16}rem;
    margin-top: ${50 / 16}rem;
  }

  .contract-failed {
    padding: 1rem 0;
    font-size: 0.8em;
    color: red;
  }
`
