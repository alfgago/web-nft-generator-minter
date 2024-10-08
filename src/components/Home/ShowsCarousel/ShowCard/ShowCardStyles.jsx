import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ShowCardStyles = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
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
      border-radius: 15px;
      z-index: 0;
    }

    .text {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 0.9rem;
      padding: 1rem;
      font-weight: bold;
      text-align: left;
      color: #fff;
      z-index: 2;

      @media ${DEVICE.laptop} {
        font-size: 1.1rem;
        padding: 1.1rem;
      }
    }

    &:before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      content: "";
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.4) 60%,
        rgba(0, 0, 0, 0) 100%
      );
      z-index: 1;
      border-radius: 15px;
    }
    :after {
      content: "";
      position: absolute;
      top: 10px;
      left: 50%;
      width: 50px;
      background: #fff;
      height: 10px;
      margin-left: -25px;
      border-radius: 50px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
    }

    .clickable.small {
      opacity: 0;
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
      color: ${COLORS.white};
      border: 2px solid ${COLORS.white};
      margin-top: 0.5rem;
      z-index: 2;
      background: #fff;
      color: #000;
      left: 1.5rem;

      @media ${DEVICE.laptop} {
        position: absolute;
        top: 0;
        left: 30%;
        margin-top: 0;
      }
    }

    &:hover .clickable.small {
      opacity: 1;
      top: 2rem;
    }
  }
`
