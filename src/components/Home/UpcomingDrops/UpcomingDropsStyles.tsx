import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDropsStyles = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  overflow: hidden;

  .content {
    z-index: 2;

    h2 {
      font-size: ${64 / 16}rem;
      max-width: ${940 / 16}rem;
      margin-bottom: ${50 / 16}rem;
    }

    .description {
      font-size: ${36 / 16}rem;
      max-width: ${572 / 16}rem;
      margin-left: auto;
      margin-top: -3rem;
    }
  }

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.blue {
    &:before {
      background: linear-gradient(
        149deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(216, 245, 254, 1) 80%
      );
      z-index: 1;
    }
  }

  img {
    pointer-events: none;
  }
`
