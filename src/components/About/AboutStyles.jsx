import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const AboutStyles = styled.main`
  p {
    font-size: ${18 / 16}rem;
    font-weight: 400;
    @media ${DEVICE.laptop} {
      font-size: ${24 / 16}rem;
    }
  }

  .cont {
    display: flex;
    .cont-desc {
      width: 100%;
      max-width: ${850 / 16}rem;
      z-index: 1;
    }

    .cont-stars {
      display: flex;
      align-items: center;
      width: 100%;
      span {
        text-align: center;
        width: 100%;
      }
    }
  }

  .simple-header {
    padding-bottom: ${100 / 16}rem;

    .white-star {
      position: absolute;
      right: 1rem;
      top: -15%;
      @media ${DEVICE.laptop} {
        top: -3%;
      }

      svg {
        max-width: ${300 / 16}rem;
        opacity: 70%;
        @media ${DEVICE.laptop} {
          opacity: 1;
          max-width: ${400 / 16}rem;
        }
      }
    }
  }
`
