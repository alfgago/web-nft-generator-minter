import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDropsStyles = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.white};
  overflow: hidden;

  .content {
    z-index: 2;

    h2 {
      max-width: ${940 / 16}rem;
      margin-bottom: ${50 / 16}rem;
    }

    .description {
      font-size: 20px;
      max-width: ${572 / 16}rem;
      margin-left: auto;
      margin-top: -3rem;
      @media ${DEVICE.laptop} {
        font-size: ${36 / 16}rem;
      }
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

  img {
    pointer-events: none;
  }
`
