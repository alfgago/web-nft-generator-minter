import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const MyNftGuestsItemStyles = styled.div`
  display: flex;

  flex-direction: column;
  .event-info-cont {
    display: flex;
    align-items: center;
    gap: ${44 / 16}rem;

    div:first-of-type {
      max-width: ${110 / 16}rem;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .location-info-cont {
    p {
      margin: 0;
      font-size: ${28 / 16}rem;
      font-weight: 500;
    }
  }

  .form-cont {
    > p {
      font-weight: 700;
    }

    .subtitle-form {
      display: none;
    }

    input {
      border-radius: 0rem !important;
    }

    @media ${DEVICE.laptop} {
      form {
        flex-direction: column;
        label {
          width: 100%;
          max-width: 100%;
        }
      }
    }
  }
`
