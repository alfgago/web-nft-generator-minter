import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const NewGuestFormStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: ${20 / 16}rem;

  div p {
    text-align: center;
    font-weight: 500;
    @media ${DEVICE.laptop} {
      padding-top: ${20 / 16}rem;
    }
  }

  .form-container {
    width: 100%;

    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: ${16 / 16}rem;
      flex-direction: column;
      align-items: center;

      .btn-container {
        display: flex;
        justify-content: end;
      }
      @media ${DEVICE.laptop} {
        flex-direction: row;

        .btn-container {
          width: 100%;
        }
      }

      label {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 0;

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

          padding-left: 1.5rem;
        }
      }

    input {
      width: 100%;
      max-width: ${380 / 16}rem;
      background: #d9d9d9;
      height: 45.61px;
      border-radius: ${12 / 16}rem;
      margin-top: ${8 / 16}rem;

      @media (${DEVICE.laptop}) {
        max-width: ${624 / 16}rem;
      }
    }

    input::placeholder {
      color: #717171;
    }
  }
`
