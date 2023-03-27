import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ShowCardStyles = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  background: rgba(255, 255, 255, 0.75);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-bottom: 2rem;
  margin-left: 1rem;

  @media ${DEVICE.laptop} {
    height: 0;
    width: 60%;
    min-width: 60%;
    padding-bottom: 60%;
  }

  .img-cont {
    position: absolute;
    width: 75%;
    height: 100%;
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      border-radius: 30px;
    }

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .clickable.small {
      opacity: 0;
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
      color: ${COLORS.white};
      border: 2px solid ${COLORS.white};
      margin-top: 0.5rem;
      &:hover {
        background: #fff;
        color: #000;
      }

      @media ${DEVICE.laptop} {
        position: absolute;
        bottom: 0;
        left: 30%;
        margin-top: 0;
      }
    }

    &:hover .clickable.small {
      opacity: 1;
      bottom: 2rem;
    }
  }

  .data-cont {
    position: absolute;
    left: 75%;
    top: 0;
    height: 100%;
    width: 25%;
    padding: 1rem 0.5rem;
    color: #000;
    text-shadow: none;
    word-break: break-word;

    .titles {
      height: 100%;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      justify-content: space-between;
    }

    .artist {
      font-weight: bold;
      font-size: 0.7rem;
      @media ${DEVICE.laptop} {
        font-size: 0.9rem;
      }
    }

    .eventname {
      font-size: 0.7rem;
      @media ${DEVICE.laptop} {
        font-size: 0.8rem;
      }
    }

    .address,
    .date {
      font-size: 0.75rem;
      margin-top: 0.5rem;
    }

    .address {
      display: none;
      @media ${DEVICE.laptop} {
        display: block;
      }
    }
  }
`
