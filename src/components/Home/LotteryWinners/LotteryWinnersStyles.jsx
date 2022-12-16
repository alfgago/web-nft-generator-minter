import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LotteryWinnersStyles = styled.section`
  position: relative;
  background: ${COLORS.white};

  background: linear-gradient(-256.8deg, #c1dce4 15.02%, #ffffff 55.64%);

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url("/assets/img/watermark3.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right top;
    pointer-events: none;
    opacity: 1;
  }

  h2 {
    max-width: ${940 / 16}rem;
    margin-bottom: ${50 / 16}rem;
  }

  .loadmore {
    position: relative;
    text-align: center;
    min-height: 1px;

    .message {
      position: absolute;
      display: block;
      width: 100%;
      top: 100%;
      margin-top: 0.5rem;
    }
  }
`
