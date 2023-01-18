import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const GoalHelpStyles = styled.section`
  .cols-cont {
    display: flex;

    .column {
      position: relative;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .title {
      padding: ${100 / 16}rem 0 ${91 / 16}rem 0;
    }

    .col-1 {
      .goal-desc {
        max-width: ${470 / 16}rem;
        text-align: start;
      }
      .bg-col1 {
        z-index: -1;
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          94.68deg,
          #f9e9ff 3.08%,
          rgba(255, 255, 255, 0) 88.15%,
          rgba(255, 255, 255, 0) 88.15%
        );
        transform: rotate(-180deg);
        transform-origin: center;
      }
    }
    .col-2 {
      background: linear-gradient(
        94.68deg,
        #e9f7ff 3.08%,
        rgba(255, 255, 255, 0) 88.15%,
        rgba(255, 255, 255, 0) 88.15%
      );
      .help-desc {
        max-width: ${444 / 16}rem;
        text-align: end;
      }
    }
  }
`
