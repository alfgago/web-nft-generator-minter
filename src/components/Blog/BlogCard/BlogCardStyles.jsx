import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const BlogCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${DEVICE.laptop} {
    width: calc(50% - 1rem);
  }

  .col-title {
    background-color: #000000;
    color: ${COLORS.white};
    padding: ${28 / 16}rem ${39 / 16}rem ${43 / 16}rem ${25 / 16}rem;
    gap: ${20 / 16}rem;
    display: flex;
    flex-direction: column;
    min-height: ${200 / 16}rem;

    span {
      padding: ${9 / 16}rem ${14 / 16}rem;
      width: fit-content;
      background-color: #0131ff;
      p {
        font-size: ${16 / 16}rem;
        font-weight: 100;
        padding: 0;
        margin: 0;
      }
    }

    h2 {
      font-size: ${36 / 16}rem;
      font-weight: 600;
    }
  }

  .col-img {
    img {
      width: 100%;
    }
  }
  .col-summary {
    padding: ${33 / 16}rem ${39 / 16}rem ${28 / 16}rem ${25 / 16}rem;
    background-color: #f3f3f3;

    p {
      font-size: ${20 / 16}rem;
      font-weight: 500;
    }
  }
`
