import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const GuestListNFTStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  background: linear-gradient(
    270deg,
    #f1ff97 -0.82%,
    rgba(243, 243, 243, 0.9) 52.7%
  );
  .content {
    justify-content: space-between;

    @media ${DEVICE.laptop} {
      display: flex;
    }
  }

  .column2 {
    display: flex;
    flex-direction: column;

    @media ${DEVICE.maxlaptop} {
      display: none;
    }
  }

  .no-data {
    display: flex;
    flex-direction: column;

    p {
      font-weight: 400;
      font-size: 15px;
    }
  }

  .mobile-col2 {
    display: flex;
    flex-direction: column;

    @media ${DEVICE.laptop} {
      display: none;
    }
  }

  .column1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .fRmyrv {
    max-width: ${700 / 16}rem;

    @media ${DEVICE.laptop} {
      max-width: 100%;
    }
  }

  .subt-filter {
    font-weight: bold;
    margin-bottom: 0;

    @media ${DEVICE.laptop} {
      margin-bottom: revert;
    }
  }

  .counter {
    margin-top: ${25 / 16}rem;
    display: flex;
    gap: 0.5rem;
    button {
      display: block;
      width: ${27 / 16}rem;
      height: ${27 / 16}rem;
      line-height: ${27 / 16}rem;
      font-size: ${16 / 16}rem;
      background: #fff;
      color: #000;
      margin: 0;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      transition: 0.5s ease all;
      &.is-active-true {
        background: #000;
        color: #fff;
      }
      &:hover {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0);
      }
    }
  }

  .loading {
    display: block;
    text-align: center;
    img {
      width: 3rem;
    }
  }
`
