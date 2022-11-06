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
    justify-content: flex-end;
    gap: ${15 / 16}rem;
    margin-top: ${50 / 16}rem;
  }
`
