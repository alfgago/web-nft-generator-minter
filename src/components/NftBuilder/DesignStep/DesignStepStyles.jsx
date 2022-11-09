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

    max-width: ${1200 / 16}rem;
  }

  .left-col {
    width: ${300 / 16}rem;
    min-width: ${300 / 16}rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .settings {
    width: 100%;
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

  .colors {
    h3 {
      font-weight: 400;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    .sketch-picker {
      margin-bottom: 1rem;
    }
  }

  .builder {
    width: 100%;
  }
`
