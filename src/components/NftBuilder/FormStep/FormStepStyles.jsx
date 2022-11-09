import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const FormStepStyles = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;

  h2 {
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    label {
      width: 100%;
      margin-bottom: ${30 / 16}rem;

      @media ${DEVICE.laptop} {
        width: calc(50% - ${30 / 16}rem);
      }

      > span {
        font-weight: bold;
        padding-left: 1.5rem;
      }

      > .alert {
        display: inline-block;
        color: red;
        list-style-type: circle;
        font-weight: 400;
        align-self: start;
        font-size: 0.7rem;
        margin-left: 0.7rem;
      }

      select,
      input {
        margin-top: ${8 / 16}rem;
      }
    }
  }
`
