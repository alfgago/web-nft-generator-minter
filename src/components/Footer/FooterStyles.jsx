import styled from "styled-components"

import { COLORS } from "@/styles/variables"

export const FooterStyles = styled.footer`
  position: relative;
  width: 100%;
  line-height: ${60 / 16}rem;
  color: ${COLORS.white};
  text-align: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/assets/img/footer-bg.png") no-repeat top center;
  }

  .footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    max-width: 100vw;
    margin: 0 auto;
    padding: ${32 / 16}rem 2.6rem;

    .waterMarkLogo {
      position: relative;
      z-index: 1;
    }

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background: #0c0c0c;
    }

    &:after {
      left: auto;
      right: 0;
    }
  }
`

export const FooterNav = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    > li {
      font-weight: 600;
      font-size: ${15 / 16}rem;
      text-transform: uppercase;
      font-weight: 600;
      margin: ${5 / 16}rem ${30 / 16}rem;
    }
  }
`
