import styled from "styled-components"

export const AnimatedCursorStyles = styled.div`
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Cursor styles */
  --cursor-stroke: #fff;
  --cursor-fill: none;
  --cursor-stroke-width: 1px;

  .cursor {
    display: none;
  }

  @media (any-pointer: fine) {
    .cursor {
      position: fixed;
      top: 0;
      left: 0;
      display: block;
      pointer-events: none;
      opacity: 0;
      z-index: 9999999;
      mix-blend-mode: difference;
    }
    .cursor__inner {
      fill: var(--cursor-fill);
      stroke: var(--cursor-stroke);
      stroke-width: var(--cursor-stroke-width);
    }
  }
`
