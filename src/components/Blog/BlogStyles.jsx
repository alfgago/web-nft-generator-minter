import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const BlogStyles = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 4rem;

  .simple-header {
    padding-bottom: 4.5rem;
  }

  .category {
    padding: ${9 / 16}rem ${14 / 16}rem;
    background-color: #0131ff;
    width: fit-content;
    p {
      font-size: 1rem;
      font-weight: 100;
      padding: 0;
      margin: 0;
    }
  }

  .title {
    font-weight: 600;
    @media ${DEVICE.laptop} {
      font-size: 2.25rem;
    }
  }
`
