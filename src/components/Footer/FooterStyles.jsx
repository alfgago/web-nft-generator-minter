import styled from "styled-components"

import { DEVICE, COLORS } from "@/styles/variables"

export const FooterStyles = styled.footer`
  position: relative;
  width: 100%;
  line-height: ${60 / 16}rem;
  color: ${COLORS.white};
  text-align: center;

  &:before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/assets/img/footer-bg.png") no-repeat top center;
    @media ${DEVICE.laptop} {
      top: 0;
    }
    background: #0c0c0c;
  }

  .footer {
    position: relative;
    padding-top: ${100 / 16}rem;
    padding-bottom: 0;
    @media ${DEVICE.laptop} {
      padding-top: ${64 / 16}rem;
    }

    .content {
      background: #0c0c0c;
      max-width: 100vw;
      margin: 0 auto;
      padding: ${32 / 16}rem 2.6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media ${DEVICE.laptop} {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    img {
      object-fit: contain;
      margin: 0;
    }

    .watermark-logo {
      position: relative;
      z-index: 1;
      max-height: 100px;
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
    margin-top: 3rem;
    @media ${DEVICE.laptop} {
      display: flex;
      margin: 0;
    }
    > li {
      font-weight: 600;
      font-size: ${15 / 16}rem;
      text-transform: uppercase;
      font-weight: 600;
      margin: ${5 / 16}rem ${30 / 16}rem;
    }
  }
`
