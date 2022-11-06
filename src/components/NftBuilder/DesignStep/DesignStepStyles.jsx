import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const DesignStepStyles = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;

  h2 {
    margin-bottom: 2rem;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: ${50 / 16}rem;
  }

  .settings {
    width: ${300 / 16}rem;
    min-width: ${300 / 16}rem;
    > div {
      font-size: ${20 / 16}rem;
      padding: ${12 / 16}rem ${24 / 16}rem;
      background: #eee;
      font-weight: 600;
      margin-bottom: ${10 / 16}rem;
      border: 2px solid transparent;
      transition: 0.25s ease all;
      cursor: pointer;

      &:hover {
        border: 2px solid #ddd;
      }

      &.active {
        border: 2px solid #000;
      }
    }
  }

  .tools {
    width: ${350 / 16}rem;
    min-width: ${350 / 16}rem;

    .options {
      .opt {
        display: block;
        margin-bottom: ${16 / 16}rem;
        width: ${100 / 16}rem;
        height: ${100 / 16}rem;
        border: 3px solid #000;
        cursor: pointer;

        &.active {
          border: 3px solid #0085ff;
        }
      }
    }
  }

  .builder {
    width: 100%;
    .canvas-container {
      background: #f4f4f4;
    }
  }
`
