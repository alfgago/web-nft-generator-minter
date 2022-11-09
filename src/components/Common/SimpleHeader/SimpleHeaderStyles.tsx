import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export interface Props {
  textAlign: string
  backgroundColor: string
  textColor: string
}

export const SimpleHeaderStyles = styled.section<Props>`
  position: relative;
  width: 100%;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  text-align: ${(props) => props.textAlign};
  padding-bottom: 0;

  h1 {
    padding: ${60 / 16}rem 0 ${30 / 16}rem 0;
  }
`
