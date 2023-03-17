import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const StepsHeaderStyles = styled.section`
  position: relative;
  width: 100%;
  padding: ${30 / 16}rem 0;
  background: linear-gradient(
    -90deg,
    #d8f5fe 10%,
    rgba(255, 255, 255, 0.9) 100%
  );

  .content {
    display: flex;
    gap: ${40 / 16}rem;

    > span {
      cursor: auto;
      pointer-events: none;
      &:hover {
        background: inherit;
        color: inherit;
      }
    }
  }
`
