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
    padding-right: .5rem;
    font-size: 16px;
    @media(${DEVICE.laptop}){
      font-size: 1.25rem;
    }
  }

  .clickable {
    font-size: 14px;
    border-color: #fff;
    &:hover {
      color: #fff;
    }
  }

  .top-content {
    display: flex;
    width: 100%;
    @media ${DEVICE.laptop} {
      max-width: ${615 / 16}rem;
      width: 50%;
    }

    .title {
      position: relative;
      justify-content: space-between;
      display: flex;
      height: 100%;
      align-items: center;
      width 100%;
      background-color: ${COLORS.black};
      color: ${COLORS.white};
      padding: .5rem 1rem;
    }

    p {
      margin: 0px;
    }

    .img-container {
      min-width: ${98 / 16}rem;
      width: ${98 / 16}rem;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      @media(${DEVICE.maxmobile}){
        width: 25%;
      }
    }

  }
  .bottom-content {
    display: flex;
    grid-column: 1;
      width: 100%;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: #dedede;
    gap: 10px;

    @media ${DEVICE.laptop} {
    width: 50%;

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
`
