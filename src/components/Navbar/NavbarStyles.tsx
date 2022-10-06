import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export interface Props {
  hasColor: boolean
}

export const HeaderStyled = styled.div<Props>`
  position: fixed;
  height: ${80 / 16}rem;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9000;
  transition: 0.3s ease-in;
  overflow: hidden;
  color: ${COLORS.white};
  background-color: ${(props) =>
    props.hasColor ? "rgba(0, 0, 0, 0.9)" : "transparent"};
  .nav-menu {
    display: flex;
    align-items: center;
  }
  .nav-menu a {
    color: ${COLORS.white};
  }
  .navbar img {
    width: ${250 / 16}rem;
    height: auto;
  }
  .nav-item {
    padding: 1rem;
    font-weight: 500;
    list-style: none;
  }
  .nav-item a:hover {
    padding-bottom: ${12 / 16}rem;
  }
`

export const NavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100vw;
  margin: auto;
  height: 100%;
  padding: 0 2.6rem;
  .logoSearch {
    display: flex;
    align-items: center;
  }
  .searchInput {
    background: transparent;
    border: solid thin ${COLORS.white};
    border-radius: 50px;
    width: ${280 / 16}rem;
    line-height: ${30 / 16}rem;
    margin-left: ${80 / 16}rem;
    padding: 0 ${20 / 16}rem;
    color: ${COLORS.white};
    :focus {
      outline: none;
    }
  }
`
