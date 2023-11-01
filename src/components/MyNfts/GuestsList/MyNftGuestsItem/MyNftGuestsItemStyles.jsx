import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const MyNftGuestsItemStyles = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0 0 15px rgba(150, 150, 150, 0.2);
  background: #111;
  padding: 1rem;
  @media ${DEVICE.laptop} {
    width: calc((100% / 3 - 5rem));
  }

  flex-direction: column;
  .event-info-cont {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      display: block;
      width: 25%;
      max-width: 25%;
      min-width: 25%;
      height: auto;
    }

    .innerinfo {
      color: #fff;
      font-size: 0.8rem;
      width: 100%;
      max-width: none;
    }
  }
  .location-info-cont {
    p {
      margin: 0;
      font-size: ${28 / 16}rem;
      font-weight: 500;
      white-space: nowrap;
    }
  }

  .form-cont {
    > p {
      font-weight: 700;
    }

    .subtitle-form {
      display: none;
    }

    label {
      color: #fff;
      .alert {
        position: absolute;
        top: 1.9rem;
        right: 1rem;
        padding: 0 !important;
        font-size: 0.65rem;
      }
    }

    input {
      background: #fff !important;
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
