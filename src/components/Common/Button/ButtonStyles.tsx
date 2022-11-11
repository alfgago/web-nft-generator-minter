import styled from "styled-components"

import { COLORS } from "@/styles/variables"

export interface Props {
  backgroundColor: string
  textColor: string
  hoverBackgroundColor: string
  hoverTextColor: string
  fontSize: number
}

export const ButtonStyles = styled.span<Props>`
  position: relative;
  display: inline-block;
  text-align: center;
  color: ${(props) => props.textColor};
  border: 1px solid #454545;
  border-radius: 50px;
  transition: 0.5s ease all;
  cursor: pointer;
  font-size: ${(props) => props.fontSize / 16}rem;
  line-height: ${26 / 16}rem;
  padding: ${10 / 16}rem ${30 / 16}rem;
  font-weight: 500;
  background-color: ${(props) => props.backgroundColor};

  &.fill {
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.backgroundColor};
  }

  &.clickable:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverTextColor};
  }
`
