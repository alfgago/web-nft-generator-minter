import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const BlogCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0;
  background-color: #f3f3f3;
  @media ${DEVICE.laptop} {
    width: calc(50% - 1rem);
  }

  .col-title {
    background-color: #000000;
    color: ${COLORS.white};
    padding: ${25 / 16}rem;

    span {
      display: inline-block;
      padding: ${9 / 16}rem ${14 / 16}rem;
      margin-bottom: ${20 / 16}rem;
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
      @media ${DEVICE.laptop} {
        min-height: ${80 / 16}rem;
      }
    }
  }

  .col-img {
    img {
      width: 100%;
    }
  }
  .col-summary {
    padding: ${25 / 16}rem;
    background-color: #f3f3f3;
    @media ${DEVICE.laptop} {
      min-height: ${200 / 16}rem;
    }

    p {
      font-size: ${20 / 16}rem;
      font-weight: 500;
      padding: 0;
      margin: 0;
      margin-bottom: ${25 / 16}rem;
    }
  }
`
