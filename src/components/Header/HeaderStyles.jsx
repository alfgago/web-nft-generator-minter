import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HeaderStyles = styled.header`
  position: relative;
  width: 100%;
  line-height: ${40 / 16}rem;
  color: ${COLORS.white};
  background-color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  text-align: center;

  @media ${DEVICE.laptop} {
    font-size: ${20 / 16}rem;
  }
`
