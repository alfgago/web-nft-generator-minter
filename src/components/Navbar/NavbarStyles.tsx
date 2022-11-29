import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export interface Props {
  hasColor: boolean
}

export const NavbarStyles = styled.section<Props>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9000;
  transition: 0.5s ease all;
  color: ${COLORS.white};
  background-color: ${(props) => (props.hasColor ? "#000" : "transparent")};
  padding: 0;
  margin: 0;
  color: #fff;
  font-size: 0.9rem;

  .content {
    height: ${80 / 16}rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      position: relative;
      display: inline-block;
      margin-right: ${80 / 16}rem;
      z-index: 9000;
    }

    .nav {
      position: fixed;
      display: block;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #000;
      display: block;
      margin-left: auto;
      visibility: hidden;
      opacity: 0;
      z-index: 2500;
      transition: 0.5s ease all;

      @media ${DEVICE.laptop} {
        position: relative;
        height: auto;
        width: auto;
        background: none;
        visibility: visible;
        opacity: 1;
        z-index: 1000;
      }

      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          position: relative;
          margin: 0 1rem;

          &:hover {
            .submenu {
              visibility: visible;
              opacity: 1;
            }
          }
        }
      }

      .submenu {
        position: absolute;
        top: 100%;
        visibility: hidden;
        opacity: 0;
        transition: 0.5s ease all;
        padding-top: 1rem;
        ul {
          display: block;
          background: #fff;
          color: #000;
          font-size: 0.75rem;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          li {
            display: block;
            margin: 0;
            a {
              display: block;
              font-size: 0.8rem;
              padding: 0.5rem 1rem;
              border-bottom: 1px solid #aaa;

              &:hover {
                background: #f5f5f5;
              }
            }

            &:last-of-type a {
              border-bottom: none;
            }
          }
        }
      }

      a {
        text-transform: uppercase;
        font-size: inherit;
        cursor: pointer;
        white-space: nowrap;
        transition: 0.5s ease all;
      }
    }

    svg {
      path {
        fill: #fff;
      }
    }

    .search-bar {
      position: relative;
      padding: 0;
      width: ${600 / 16}rem;
      max-width: 50%;
      display: none;
      @media ${DEVICE.laptop} {
        display: block;
      }
      .search-input {
        background: transparent;
        border: solid 2px ${COLORS.white};
        border-radius: 50px;
        font-weight: 400;
        width: 100%;
        line-height: ${38 / 16}rem;
        padding: 0 ${20 / 16}rem;
        color: ${COLORS.white};
        padding-right: ${40 / 16}rem;
        font-size: inherit;
        :focus {
          outline: none;
        }
      }

      svg {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        height: ${18 / 16}rem;
        width: auto;
      }
    }

    @media ${DEVICE.maxlaptop} {
      .hamburger {
        transform: scale(0.8);
        padding-right: 0;
      }

      li.li-wallet,
      li.li-account {
        display: none;
      }

      .nav {
        padding-top: 8rem;
        pointer-events: none;
        ul {
          width: 100%;
          display: block;
          li {
            a {
              display: block;
              padding: 1rem;
              text-align: center;
              color: #fff;
              font-size: 1.5rem;
              font-weight: bold;
              background: none !important;
            }

            .submenu {
              display: block;
              position: relative;
              visibility: visible;
              opacity: 1;
              padding: 0;
              ul {
                background: none;
                a {
                  display: block;
                  background: none;
                  border: 0;
                  text-transform: none;
                  font-weight: 300;
                  font-size: 1.3rem;
                }
              }
              &.account-submenu {
                a {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                  svg {
                    height: 25px;
                  }
                  > span {
                    margin-top: -3px;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }

      &.is-active {
        .nav {
          visibility: visible;
          opacity: 1;
          pointer-events: all;
        }
      }
    }
  }

  .hamburger {
    z-index: 2500;
    @media ${DEVICE.laptop} {
      display: none;
    }

    .hamburger.is-active .hamburger-inner,
    .hamburger.is-active .hamburger-inner:after,
    .hamburger.is-active .hamburger-inner:before,
    .hamburger-inner,
    .hamburger-inner:after,
    .hamburger-inner:before {
      background-color: #fff;
    }
  }
`
