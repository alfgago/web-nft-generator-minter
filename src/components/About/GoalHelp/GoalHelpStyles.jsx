import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const GoalHelpStyles = styled.section`
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;

  justify-content: center;

  &:before {
    background-image: url("/assets/img/circles-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    content: "";
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    z-index: -3;
    width: 100%;
    height: 100%;
    @media ${DEVICE.laptop} {
      width: 90%;
    }
  }

  .cols-cont {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    @media ${DEVICE.laptop} {
      height: ${727 / 16}rem;
      flex-direction: row;
    }

    .star {
      z-index: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      svg {
        display: block;
        height: ${270 / 16}rem;
        width: 13.875rem;

        @media ${DEVICE.laptop} {
          width: ${270 / 16}rem;
        }
      }
    }
    .column {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${30 / 16}rem;
      @media ${DEVICE.laptop} {
        gap: ${91 / 16}rem;
        width: 50%;
      }
    }

    .title {
      width: 100%;
      padding-top: ${52 / 16}rem;

      @media ${DEVICE.laptop} {
        padding-top: ${100 / 16}rem;
      }

      h2 {
        padding-left: ${15 / 16}rem;
      }
      .white-h {
        -webkit-text-stroke: 1px ${COLORS.black};
        color: transparent;
      }
    }

    .col-1 {
      .goal-desc {
        max-width: ${470 / 16}rem;
        z-index: 1;
        margin: 0 2rem;

        @media ${DEVICE.laptop} {
          text-align: start;
          margin: 0;
        }
      }
      &:before {
        content: "";
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
      padding-bottom: ${30 / 16}rem;

      &:before {
        content: "";
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        background: linear-gradient(
          94.68deg,
          #f9e9ff 3.08%,
          rgba(255, 255, 255, 0) 88.15%,
          rgba(255, 255, 255, 0) 88.15%
        );
        transform: rotate(180deg);

        @media ${DEVICE.laptop} {
          transform: rotate(0deg);
          background: linear-gradient(
            94.68deg,
            #e9f7ff 3.08%,
            rgba(255, 255, 255, 0) 88.15%,
            rgba(255, 255, 255, 0) 88.15%
          );
        }
      }

      .help-desc {
        max-width: ${444 / 16}rem;
        z-index: 1;
        margin: 0 2rem;
        @media ${DEVICE.laptop} {
          text-align: end;
        }
      }
    }
  }

  .top-triangle {
    display: block;
    position: absolute;
    width: 100%;
    object-fit: cover;
    height: 4.5rem;
    top: -3rem;
    z-index: 1;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
  }
`
