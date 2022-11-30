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
`
