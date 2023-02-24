import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const UpcomingShowStyles = styled.section`
  background: ${COLORS.white};

  h2 {
    margin-bottom: ${40 / 16}rem;
  }

  @media ${DEVICE.laptop} {
    padding-top: 8rem;
  }

  @media ${DEVICE.maxlaptop} {
    padding-bottom: 0;
  }
`
export const BoxDrops = styled.div`
  flex-direction: column;
  @media ${DEVICE.laptop} {
    display: flex;
  }
`
export const DropRow = styled.div`
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
      width: ${227 / 16}rem;
    }

    .place {
      margin-top: 0.5rem;
      font-size: 0.6em;
      text-align: left;
      width: 100%;
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
  .collection {
    display: flex;
    align-items: center;
    background: #f2f2f2;
    font-weight: 400;
    width: revert;
    @media ${DEVICE.laptop} {
      width: ${400 / 16}rem;
    }
    .name {
      margin-left: ${20 / 16}rem;
      display: none;

      @media ${DEVICE.laptop} {
        display: initial;
      }
    }
    img {
      height: ${130 / 16}rem;
      width: ${130 / 16}rem;
      object-fit: cover;

      @media ${DEVICE.laptop} {
        height: ${190 / 16}rem;
        width: ${190 / 16}rem;
      }
    }
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f2f2f2;
    padding: ${20 / 16}rem ${21 / 16}rem;
    font-weight: 600;
    margin-left: 0;
    width: 100%;
    flex: 1;
    @media ${DEVICE.laptop} {
      width: ${273 / 16}rem;
      margin-left: ${10 / 16}rem;
      font-size: ${19 / 16}rem;
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${10 / 16}rem;
    flex-direction: column;
    justify-content: space-around;
    padding: ${5 / 16}rem;
    gap: 5px;

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
      }
      @media ${DEVICE.maxmobile} {
        padding: ${10 / 16}rem ${18 / 16}rem;
      }
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
      width: 100%;
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
      .name-mobile {
        height: ${51 / 16}rem;
        background-color: #f2f2f2;
        display: flex;
        align-items: center;
        padding: ${9 / 16}rem ${16 / 16}rem;
        @media ${DEVICE.laptop} {
          display: none;
        }
      }
    }
  }
`
