import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const NftCollectionStyles = styled.section`
  position: relative;
  padding-top: ${40 / 16}rem;
  padding-bottom: ${40 / 16}rem;

  .header-collection {
    display: flex;
    flex-direction: column;
    padding-bottom: ${20 / 16}rem;

    @media ${DEVICE.laptop} {
      padding-bottom: 0;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .collections {
    margin-top: 1.5rem;
  }

  .sec-tittles {
    display: none;

    @media (${DEVICE.laptop}) {
      display: flex;
    }

    p {
      font-weight: 500;
      text-align: center;
    }

    div:first-of-type {
      max-width: 38.4375rem;
      p {
        width: 100%;
      }
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .sec-info p:first-of-type {
      max-width: 38.4375rem;
      width: 33.33%;

      ~ p {
        width: 33.33%;
      }
    }

    .p-3 {
      max-width: 9.625rem;

      span {
        font-weight: 400;
      }
    }
  }

  .star {
    position: absolute;
    right: ${0 / 16}rem;
    top: -45px;
    transform: translateY(-35%);

    @media (${DEVICE.laptop}) {
      right: -107px;
      top: -20px;
    }

    svg {
      width: ${112 / 16}rem;
      height: ${436 / 16}rem;

      @media (${DEVICE.laptop}) {
        width: ${380 / 16}rem;
        height: ${436 / 16}rem;
      }
    }
  }
`
