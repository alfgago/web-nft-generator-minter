import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const EventCardStyles = styled.div`
  width: 100%;
  @media ${DEVICE.laptop} {
    width: calc(50% - 1rem);
  }
  display: flex;
  position: relative;
  width: 100%;
  background: ${COLORS.white};
  box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  flex-direction: column;

  @media ${DEVICE.laptop} {
    flex-direction: row;
  }

  .data-cont {
    display: inline-flex;
    flex-direction: column;
    border-bottom-left-radius: 50px;
    transition: 0.5s ease all;
    padding: ${25 / 16}rem ${20 / 16}rem;
    width: 100%;
    justify-content: space-between;
    @media ${DEVICE.laptop} {
      width: 50%;
    }

    .bnt-cont {
      margin-left: auto;
    }
    .title {
      font-size: ${20 / 16}rem;
      font-weight: 600;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${20 / 16}rem;
      }
    }

    .date,
    .artist,
    .address,
    .descrip {
      font-size: ${16 / 16}rem;
      font-weight: 400;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${18 / 16}rem;
      }
      span {
        font-size: ${14 / 16}rem;
        font-weight: 400;
        margin-bottom: 1rem;
        @media ${DEVICE.laptop} {
          font-size: ${15 / 16}rem;
        }
      }
    }
  }
  .img-cont {
    position: relative;
    height: 0;
    padding-bottom: 45%;
    width: 100%;

    @media ${DEVICE.laptop} {
      width: 45%;
    }

    /* padding-bottom: 45%; */
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
