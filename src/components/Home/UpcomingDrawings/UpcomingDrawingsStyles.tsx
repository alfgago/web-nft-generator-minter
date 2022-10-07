import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingDrawingsStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  overflow: hidden;

  background: linear-gradient(
    93.26deg,
    #f1ff97 -0.82%,
    rgba(255, 255, 255, 0.9) 52.7%
  );

  .content {
    h2 {
      font-size: ${64 / 16}rem;
      max-width: ${940 / 16}rem;
      margin-bottom: ${50 / 16}rem;
    }
  }

  .flex {
    display: flex;
    flex-direction: column;
    @media ${DEVICE.laptop} {
      justify-content: space-between;
      flex-direction: row;
    }
  }
`
