import styled from "styled-components"
import { COLORS } from "@/styles/variables"

export const FooterStyles = styled.footer`
  position: relative;
  width: 100%;
  line-height: ${60 / 16}rem;
  color: ${COLORS.white};
  background-color: #0c0c0c;
  text-align: center;

  .footer {
    position: relative;
    display: flex;
    height: 216px;
    justify-content: space-around;
    max-width: 1728px;
    margin: 0 auto;
    padding: ${32 / 16}rem 0;

    background: linear-gradient(
      270deg,
      #d8f5fe 8.41%,
      rgba(255, 255, 255, 0.9) 88.16%
    );
  }
`

export const FooterBg = styled.div`
  display: flex;
  width: 100%;
  background: url("./resources/img/footer-bg.png") no-repeat;
  height: 216px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  align-items: center;
  justify-content: flex-end;
  .waterMarkLogo {
    position: absolute;
    left: 51px;
  }
`

export const FooterNav = styled.div`
  display: flex;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    > li {
      font-weight: 600;
      font-size: 15px;
      text-transform: uppercase;
      font-weight: 600;
      margin: 5px 30px;
    }
  }
`
