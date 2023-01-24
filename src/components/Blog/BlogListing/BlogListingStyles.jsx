import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const BlogListingStyles = styled.section`
  padding-top: 0;

  .list {
    display: flex;
    gap: ${32 / 16}rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .content {
    display: flex;
    justify-content: center;
  }
`
