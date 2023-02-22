import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const EventCardStyles = styled.div`
  width: calc(50% - 1rem);
  .lazyload-wrapper {
    display: flex;
    position: relative;
    width: 100%;
    background: ${COLORS.white};
    box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;

    .data-cont {
      padding: 0 !important;
      display: inline-flex;
      flex-direction: column;
      border-bottom-left-radius: 50px;
      transition: 0.5s ease all;
      width: 50%;
    }
    .img-cont {
      position: relative;
      height: 0;
      width: 45%;
      padding-bottom: 45%;

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
  }
`
