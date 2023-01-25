import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const FirstBlogStyle = styled.section`
  padding-top: 0;
  background-color: #0c0c0c;
  margin-top: ${-7 / 16}rem;
  color: ${COLORS.white};

  .wrapper {
    display: flex;

    justify-content: center;
    gap: ${109 / 16}rem;

    .col-img {
      img {
        width: 100%;
        max-width: ${588 / 16}rem;
      }
    }
    .col-text {
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: ${20 / 16}rem;
      p {
        margin: 0;
      }
    }

    .btn {
      max-width: ${154 / 16}rem;
      display: flex;
      justify-content: center;
    }
  }
`
