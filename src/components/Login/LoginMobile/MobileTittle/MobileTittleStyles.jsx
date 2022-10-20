import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const MobileTittleStyles = styled.div`
  height: 153vh;
  width: 100%;

  .title {
    max-height: ${138 / 16}rem;
    padding: 4.5rem ${40 / 16}rem;
    margin: 0;
    font-weight: 700;
    font-size: ${28 / 16}rem;
    line-height: ${30.8 / 16}rem;
    background-color: ${COLORS.black};
    color: ${COLORS.white};
    text-align: center;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`
