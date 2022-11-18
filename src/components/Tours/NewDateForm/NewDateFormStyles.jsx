import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"
export const NewDateFormStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #717171;
  padding-top: ${20 / 16}rem;

  .modal-content {
    padding-top: 2rem;
  }

  .form-container {
    width: 100%;
    overflow: scroll;

    form {
      display: flex;
      flex-direction: column;
      gap: ${16 / 16}rem;

      align-items: center;
    }

    input {
      width: 100%;
      max-width: ${380 / 16}rem;
      background: #d9d9d9;
      height: 45.61px;
      color: #717171;
      border-radius: ${12 / 16}rem;

      @media (${DEVICE.laptop}) {
        max-width: ${624 / 16}rem;
      }
    }

    input::placeholder {
      color: #717171;
    }
    .alert {
      color: red;
    }
  }

  button {
    background-color: #777777;
    width: 10.5rem;
    height: ${51 / 16}rem;
    border-radius: 30px;
    border: none;
    color: #fff;
    padding: 7px 2px 7px 2px;

    @media only screen and (${DEVICE.laptop}) {
      width: ${109 / 16}rem;
      height: ${41 / 16}rem;
      border-radius: 12px;

      align-self: center;
    }
  }
`
