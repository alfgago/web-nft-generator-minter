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

      &.wallet {
        width: ${700 / 16}rem;
      }
    }
  }

  .collection-minting {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999999999999999;
    background: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${30 / 16}rem;
    font-weight: 300;

    span {
      display: block;
      max-width: 90%;
      width: ${500 / 16}rem;
      padding: 1rem;
      background: #fff;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    }

    img {
      width: 100%;
      object-fit: contain;
      height: 3rem;
      margin-top: 1rem;
    }
  }
`
