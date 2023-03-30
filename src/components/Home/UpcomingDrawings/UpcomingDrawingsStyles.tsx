import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDrawingsStyles = styled.section`
  position: relative;
  width: 100%;
  background: #fff;
  color: ${COLORS.black};
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      93.26deg,
      #f1ff97 -0.82%,
      rgba(255, 255, 255, 0.9) 52.7%
    );
    background: linear-gradient(
      -80.62deg,
      #f9e9ff 8.41%,
      rgba(255, 255, 255, 0.9) 88.16%
    );
  }

  .content {
    position: relative;
    h2 {
      max-width: ${940 / 16}rem;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        margin-bottom: ${50 / 16}rem;
      }
    }
  }

  .flex {
    display: flex;
    flex-direction: column;
    @media ${DEVICE.laptop} {
      justify-content: space-between;
      flex-direction: row;
      .column1 {
        order: 2;
      }
    }
  }

  .counter {
    margin-top: ${25 / 16}rem;
    display: flex;
    gap: 0.5rem;
    button {
      display: block;
      width: ${27 / 16}rem;
      height: ${27 / 16}rem;
      line-height: ${27 / 16}rem;
      font-size: ${16 / 16}rem;
      background: #fff;
      color: #000;
      margin: 0;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      transition: 0.5s ease all;
      &.is-active-true {
        background: #000;
        color: #fff;
      }
      &:hover {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0);
      }
    }
  }
`
