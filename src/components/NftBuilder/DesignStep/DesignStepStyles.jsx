import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const DesignStepStyles = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;

  h2 {
    margin-bottom: 2rem;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: ${50 / 16}rem;

    max-width: ${1200 / 16}rem;
  }

  .left-col {
    width: ${300 / 16}rem;
    min-width: ${300 / 16}rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .settings {
    width: 100%;
    > div {
      font-size: ${20 / 16}rem;
      padding: ${12 / 16}rem ${24 / 16}rem;
      background: #eee;
      font-weight: 600;
      margin-bottom: ${10 / 16}rem;
      border: 2px solid transparent;
      transition: 0.25s ease all;
      cursor: pointer;

      &:hover {
        border: 2px solid #ddd;
      }

      &.active {
        border: 2px solid #000;
      }
    }
  }

  .tools {
    width: ${350 / 16}rem;
    min-width: ${350 / 16}rem;

    .options {
      .opt {
        position: relative;
        display: block;
        margin-bottom: ${16 / 16}rem;
        width: ${100 / 16}rem;
        height: ${100 / 16}rem;
        border: 3px solid #000;
        cursor: pointer;

        &:before {
          content: "";
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          background: #fff;
          border: 1px solid #000;
          pointer-events: none;
        }

        &:after {
          content: "";
          position: absolute;
          bottom: 8px;
          right: 8.5px;
          width: 14px;
          height: 14px;
          background: #1e73f3;
          opacity: 0;
          transition: 0.5s ease all;
          pointer-events: none;
        }

        &:hover:after {
          opacity: 0.4;
        }

        &.active {
          border: 3px solid #0085ff;

          &:after {
            opacity: 1;
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      &.shapes-options {
        display: flex;
        flex-wrap: wrap;
        width: ${210 / 16}rem;
        gap: ${10 / 16}rem;
        .opt {
          width: ${90 / 16}rem;
          height: ${90 / 16}rem;
          margin: 0;
        }
      }
    }
  }

  .colors {
    h3 {
      font-weight: 400;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    .sketch-picker {
      margin-bottom: 1rem;
    }
  }

  .builder {
    width: 100%;
  }
`
