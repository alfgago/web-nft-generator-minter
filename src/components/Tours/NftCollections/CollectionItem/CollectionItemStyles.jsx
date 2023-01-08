import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CollectionItemStyles = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .itemWrapper {
    width: 100%;
    max-width: 40rem;
    padding-bottom: ${34 / 16}rem;
    display: flex;
    flex-direction: column;

    @media(${DEVICE.laptop}){
      flex-direction: row;
      max-width: none;
    }
  }

  h3 {
    @media(${DEVICE.maxlaptop}){
      font-size: 16px;
    }
  }

  .container {
    display: flex;
    @media ${DEVICE.laptop} {
      max-width: ${615 / 16}rem;
      width: 100%;
    }

    .content {
      width 50%;
      background-color: ${COLORS.black};
      color: ${COLORS.white};
      padding: ${5 / 16}rem ${20 / 16}rem ${10 / 16}rem ${15 / 16}rem;
    }

    p {
      margin: 0px;
    }

    .img-container {
      width: 50%;

      max-width: ${98 / 16}rem;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      @media(${DEVICE.maxmobile}){
        width: 25%;
      }
    }

    .content + div {
      padding: ${16 / 16}rem ${20 / 16}rem ${20 / 16}rem ${0 / 16}rem;
      background-color: ${COLORS.black};
      width: 50%;
      justify-content: center;
      display: flex;
      align-items: center;
      button {
        padding: ${10 / 16}rem ${16 / 16}rem;
        width: 100%;
        border-radius: ${49 / 16}rem;
        border: 0px;
        background-color: #d7d7d7;
        font-weight: bold;
      }

      @media(${DEVICE.maxmobile}){
        padding: ${16 / 16}rem ${1 / 16}rem ${20 / 16}rem ${0 / 16}rem;
      }
    }
  }
  .bottom-content {
    display: flex;
    grid-column: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: #dedede;
    gap: 10px;

    @media ${DEVICE.laptop} {
      width: 100%;

      div:first-of-type {
        max-width: ${252 / 16}rem;
      }

      .middle + div {
        max-width: ${154 / 16}rem;
      }
    }

    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      @media ${DEVICE.laptop} {
        flex: 1;
      }
    }

    .middle {
      border-right: ${1 / 16}rem solid white;
      border-left: ${1 / 16}rem solid white;

      @media ${DEVICE.laptop} {
        border-right: ${8 / 16}rem solid white;
        border-left: ${8 / 16}rem solid white;
        width: ${307 / 16}rem;
      }
    }
  }

  .img-container + div {
    display: flex;
    background-color: ${COLORS.black};
    width: 100%;

    @media(${DEVICE.maxmobile}){
      width: 75%;
    }
  }
`
