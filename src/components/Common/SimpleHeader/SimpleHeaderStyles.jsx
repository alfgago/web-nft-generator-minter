import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const SimpleHeaderStyles = styled.section`
  position: relative;
  width: 100%;
  background: #000;
  color: #fff;
  padding-bottom: 0;

  h1 {
    padding: ${60 / 16}rem 0 ${30 / 16}rem 0;
  }
`
