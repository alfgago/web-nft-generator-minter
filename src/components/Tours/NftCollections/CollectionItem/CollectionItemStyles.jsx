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
    padding-bottom: 15px;
  }

  .container {
    display: flex;
    .content {
        width 96%;
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
    }

    .content + div {
      padding: 16px 20px 20px 0px;
      background-color: ${COLORS.black};
      width: 100%;
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
    }
  }
  .bottom-content {
    display: flex;
    grid-column: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: #dedede;
    div {
      width: 100%;
    }

    .middle {
      border-right: 1px solid white;
      border-left: 1px solid white;
    }
  }

  .img-container + div {
    display: flex;
    background-color: ${COLORS.black};
    width: 100%;
  }
`
