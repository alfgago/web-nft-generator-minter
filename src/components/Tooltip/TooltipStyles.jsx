import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const TooltipStyles = styled.div`
  position: relative;
  display: inline-block;
  color: #fb00fb;

  svg {
    width: 1.1em;
    height: 1.1em;
  }

  .text {
    display: none;
    position: absolute;
    left: -20px;
    top: 2rem;
    padding-bottom: -px;
    background: #222;
    color: #fff;
    font-size: max(0.75rem, 12px);
    font-weight: 400;
    z-index: 99;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    width: ${300 / 16}rem;
    padding: 0.5rem 0.75rem;
    border-radius: 5px;

    &:before {
      content: "";
      position: absolute;
      left: 1rem;
      bottom: 100%;

      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 15px 10px 15px;
      border-color: transparent transparent #222 transparent;
    }
  }

  &:hover .text {
    display: block;
  }

  &.left {
    .text {
      left: auto;
      right: -20px;

      &:before {
        right: 1rem;
        left: auto;
      }
    }
  }
`
