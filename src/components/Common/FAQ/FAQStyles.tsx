import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const FAQStyles = styled.section`
  position: relative;
  width: 100%;

  h2 {
    margin-bottom: ${50 / 16}rem;
  }

  .Collapsible {
    position: relative;
    padding: ${15 / 16}rem ${34 / 16}rem;
    width: 100%;
    background: #fff;
    border: 2px solid #454545;
    border-radius: 40px;
    margin-bottom: ${25 / 16}rem;
    color: #000;

    &:before {
      position: absolute;
      content: "";
      top: ${18 / 16}rem;
      right: ${34 / 16}rem;
      width: ${20 / 16}rem;
      height: ${20 / 16}rem;
      background-image: url("/assets/vectors/faq-toggle.svg");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;

      pointer-events: none;
      transition: 0.25s ease all;
    }

    &.active {
      &:before {
        transform: rotate(-180deg);
      }
    }

    .Collapsible__trigger {
      display: block;
      position: relative;
      width: 100%;
      font-family: "Trap";
      font-weight: 600;
      font-size: ${28 / 16}rem;
      line-height: ${30 / 16}rem;
      cursor: pointer;
    }

    .answer {
      padding-top: ${15 / 16}rem;
      font-family: "Inter";
      font-weight: 300;
      font-size: ${20 / 16}rem;
      line-height: ${25 / 16}rem;
      padding-bottom: ${10 / 16}rem;
    }
  }
`
