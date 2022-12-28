import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ConfirmationStepStyles = styled.div`
  position: relative;
  width: 100%;

  h2 {
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 1rem;
  }

  .canvas-container {
    width: 300px !important;
    height: 300px !important;
    pointer-events: none;
    canvas {
      width: 300px !important;
      height: 300px !important;
    }
  }

  .actions {
    button {
      margin-top: 1rem;
    }
  }

  .preview {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: ${15 / 16}rem;

    .nft {
      width: ${150 / 16}rem;
    }

    svg,
    img {
      width: 100%;
      height: 100%;
    }
  }

  .form-confirm {
    display: flex;
    flex-wrap: wrap;

    label {
      display: block;
      width: ${350 / 16}rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      border: 1px solid #000;
      span {
        display: block;
      }
    }
  }
`
