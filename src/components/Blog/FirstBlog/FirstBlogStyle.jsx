import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const FirstBlogStyle = styled.section`
  background-color: #0c0c0c;
  margin-top: ${-7 / 16}rem;
  color: ${COLORS.white};

  .wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: ${50 / 16}rem;

    @media ${DEVICE.laptop} {
      gap: ${109 / 16}rem;
      flex-direction: row;
    }

    .col-img {
      img {
        width: 100%;

        @media ${DEVICE.laptop} {
          max-width: ${588 / 16}rem;
        }
      }
    }
    .col-text {
      display: flex;
      flex-direction: column;
      gap: ${20 / 16}rem;
      width: 100%;

      @media ${DEVICE.laptop} {
        width: 50%;
      }
      > p {
        font-weight: 500;
        margin: 0;
        @media ${DEVICE.laptop} {
          font-size: 1.25rem;
        }
      }
    }

    .btn {
      max-width: ${154 / 16}rem;
      display: flex;
      justify-content: center;
    }
  }
`
