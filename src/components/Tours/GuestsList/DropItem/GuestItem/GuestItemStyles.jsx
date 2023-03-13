import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"

export const GuestItemStyles = styled.div`
  display: flex;
  padding-bottom: ${10 / 16}rem;
  width: 100%;

  .container {
    width: 75%;
    background: #f5f5f5;

    @media ${DEVICE.laptop} {
      background: #fff;
      width: 100%;
      display: flex;
      text-align: center;
      gap: ${15 / 16}rem;
    }
  }

  .container div {
    width: 100%;

    padding: ${10 / 16}rem ${16 / 16}rem;
    p {
      margin: 0;
    }

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .black-header {
    background-color: ${COLORS.black};
    color: ${COLORS.white};
    font-weight: 500;
  }

  .black-header ~ div {
    background: #f5f5f5;
  }

  .mid-cont {
    border-bottom: ${1 / 16}rem #fff solid;
  }

  div > img {
    height: 100%;
    object-fit: cover;
    width: 100%;
    max-width: ${143 / 16}rem;

    @media ${DEVICE.laptop} {
      max-width: ${98 / 16}rem;
    }
  }
`
