import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ShowCardStyles = styled.div`
  width: 100%;
  display: flex;
  @media ${DEVICE.laptop} {
    width: 100%;
    margin-bottom: 2rem;
  }

  .artist {
    font-weight: bold;
    font-size: 1rem;
    @media ${DEVICE.laptop} {
      font-size: 1.2rem;
    }
  }

  .eventname {
    font-size: 0.85rem;
    @media ${DEVICE.laptop} {
      font-size: 1rem;
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

  .data-cont {
    position: relative;
    height: auto;
  }

  .clickable.small {
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
      left: 0;
      margin-top: 0;
    }
  }

  .img-cont {
    position: relative;
    height: 100px;
    width: 100px;
    min-width: 100px;
    margin-right: 1rem;

    @media ${DEVICE.laptop} {
      height: 0;
      width: 30%;
      min-width: 30%;
      padding-bottom: 30%;
    }

    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }
`
