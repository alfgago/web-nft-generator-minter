import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ShowRowStyles = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${35 / 16}rem;
  flex-direction: column;
  align-items: center;

  @media ${DEVICE.laptop} {
    font-size: ${24 / 16}rem;
    flex-direction: row;
    align-items: revert;
  }

  .event-name {
    display: block;
    font-weight: 400;
    background: #000;
    color: ${COLORS.white};
    padding: ${16 / 16}rem;
    flex-wrap: wrap;
    width: 100%;
    @media ${DEVICE.laptop} {
      padding: ${20 / 16}rem;
      width: ${300 / 16}rem;
    }

    .place {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.8em;
      text-align: left;
      width: 100%;
      @media ${DEVICE.laptop} {
        font-size: 0.6em;
      }
    }
  }
  .date {
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #ffd1fb;
    padding: ${9 / 16}rem ${16 / 16}rem;
    @media ${DEVICE.laptop} {
      width: ${196 / 16}rem;
    }
  }

  .select-component {
    padding: 1rem;
    width: 100%;
    position: relative;
    background: #f2f2f2;
    .howto {
      font-size: 1rem;
      padding-bottom: 3px;
    }
    @media ${DEVICE.laptop} {
      background: none;
      padding: ${20 / 16}rem;
    }

    select {
      background: none;
      white-line: normal;
      font-size: 1em;
      width: 100%;
      white-space: normal;
      appearance: none;
      border: 0;
      outline: none;
      border: 1px solid #000;
      padding: 3px 8px;
      appearance: none;
      @media ${DEVICE.laptop} {
        border: none;
        padding: 0;
      }
    }

    .chevron {
      position: absolute;
      display: block;
      right: 2rem;
      top: 50%;
      margin-top: 0px;
      object-fit: contain;
      pointer-events: none;
      svg {
        width: ${10 / 16}rem;
        height: ${10 / 16}rem;
      }

      @media ${DEVICE.laptop} {
        margin-top: -${18 / 16}rem;
        svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }

  .collection {
    display: flex;
    align-items: center;
    background: #f2f2f2;
    font-weight: 400;
    width: revert;
    @media ${DEVICE.laptop} {
      width: ${450 / 16}rem;
    }

    .name {
      padding-right: ${40 / 16}rem;
      display: none;
      font-size: 1.3rem;

      @media ${DEVICE.laptop} {
        display: block;
      }
    }

    img {
      height: ${160 / 16}rem;
      width: ${160 / 16}rem;
      min-width: ${160 / 16}rem;
      object-fit: cover;

      @media ${DEVICE.laptop} {
        height: ${160 / 16}rem;
        width: ${160 / 16}rem;
        min-width: ${160 / 16}rem;
      }
    }
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #f2f2f2;
    padding: 1rem;
    font-weight: 600;
    margin-left: 0;
    width: 100%;
    flex: 1;
    @media ${DEVICE.laptop} {
      width: ${200 / 16}rem;
      min-width: ${200 / 16}rem;
      margin-left: ${10 / 16}rem;
      font-size: ${19 / 16}rem;
      padding: ${20 / 16}rem ${21 / 16}rem;
    }

    .timer-title {
      font-size: 0.7rem;
      font-weight: 400;
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${10 / 16}rem;
    flex-direction: column;
    justify-content: center;
    padding: ${5 / 16}rem;
    gap: 10px;
    min-width: ${160 / 16}rem;

    button {
      width: 100%;
      border: none;
      font-size: ${12 / 16}rem;
      line-height: ${19 / 16}rem;
      padding: ${10 / 16}rem ${34 / 16}rem;
      margin: 0 ${2 / 16}rem;
      color: ${COLORS.white};
      font-weight: 500;
      background: #373737;
      border-radius: ${29 / 16}rem;
      :hover {
        background: #858585;
        cursor: pointer;
      }
      @media ${DEVICE.laptop} {
        font-size: ${18 / 16}rem;
        &.atcb-button {
          font-size: ${14 / 16}rem;
          padding: ${10 / 16}rem ${10 / 16}rem;
        }
      }
      @media ${DEVICE.maxmobile} {
        padding: ${10 / 16}rem ${18 / 16}rem;
      }
    }

    span.atcb-icon {
      display: none;
    }
    .variant {
      background: #c2c2c2;
    }
  }

  .cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${700 / 16}rem;

    @media ${DEVICE.laptop} {
      flex-direction: row;
      max-width: 100%;
    }

    .wrap-end {
      display: flex;
      padding-top: ${10 / 16}rem;

      @media ${DEVICE.laptop} {
        padding-top: 0;
      }
    }

    .wrap-main {
      display: flex;
      width: 100%;

      .main-cont {
        width: 100%;

        @media ${DEVICE.laptop} {
          width: revert;
        }
      }
      .row-1 {
        display: flex;
        height: revert;
        @media ${DEVICE.laptop} {
          height: 100%;
        }
      }
    }
  }
`
