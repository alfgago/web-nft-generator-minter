import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const FormStepStyles = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;

  h2 {
    margin-bottom: 2rem;
    span {
      font-size: 0.6em;
      font-weight: 500;
    }
  }

  .hidden {
    display: none;
  }

  .description {
    font-size: 0.9rem;
    color: #888;
    padding: 0.5rem 1rem;
    .connect {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`
