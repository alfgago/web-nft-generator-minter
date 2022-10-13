import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export interface Props {
  hasColor: boolean
}

export const NavbarStyles = styled.div<Props>`
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
  display: flex;
  align-items: center;
  padding: 0 2.6rem;
  color: #fff;

  .logo {
    display: inline-block;
    margin-right: ${140 / 16}rem;
  }

  .right-nav {
    margin-left: auto;
  }

  a {
    text-transform: uppercase;
    font-size: 1rem;
  }

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin: 0 2rem;
    }
  }

  .search-li {
    position: relative;
    padding: 0;
    .search-input {
      background: transparent;
      border: solid 2px ${COLORS.white};
      border-radius: 50px;
      font-weight: 400;
      width: ${330 / 16}rem;
      line-height: ${38 / 16}rem;
      padding: 0 ${20 / 16}rem;
      color: ${COLORS.white};
      padding-right: ${40 / 16}rem;
      font-size: 1rem;
      :focus {
        outline: none;
      }
    }

    img {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      height: ${18 / 16}rem;
      width: auto;
    }
  }
`
