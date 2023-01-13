import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const BlogPostStyles = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 4rem;

  .simple-header {
    padding-bottom: 4.5rem;
  }

  .content {
    img {
      width: 100%;
      height: auto;
    }

    .inner {
      margin: 2rem 0;
      font-size: 1.5rem;
    }

    .author {
      margin: 1rem 0;
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }
  }
`
