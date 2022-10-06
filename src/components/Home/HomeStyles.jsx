import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HomeStyles = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  background-color: ${COLORS.white};

  @media ${DEVICE.laptop} {
    font-size: ${16 / 16}rem;
  }
`
