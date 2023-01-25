import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ModalStyles = styled.section`
  display: flex;
  z-index: 1;
  position: fixed;
  color: ${COLORS.black};
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0rem;
  padding: 0;
  width: 100%;
  height: 100%;
  z-index: 9000;
  background-color: ${COLORS.white};

  @media ${DEVICE.laptop} {
    background-color: transparent;
  }

  .modal-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .modal-content {
    background-color: ${COLORS.white};
    width: 100%;
    padding: 2rem 0 3rem 0;

    @media ${DEVICE.laptop} {
      height: 100%;
      border-radius: ${12 / 16}rem;
      margin-top: -3rem;
      padding-top: 5rem;
    }

    a {
      color: #717171;
      font-size: 1rem;
    }
  }

  .modal-header {
    position: relative;
    content: "";
    background-color: ${COLORS.black};
    color: ${COLORS.white};
    padding: 2rem 0;
    align-items: center;

    @media ${DEVICE.laptop} {
      border-top-left-radius: ${8 / 16}rem;
      border-top-right-radius: ${8 / 16}rem;
      position: relative;
      content: "";
      background: url("/assets/img/login-header.svg") no-repeat;
      background-size: cover;
      object-fit: cover;
      background-position: left center;
      padding: 1.5rem 0;
      max-height: 127px;
    }

    div:first-of-type {
      width: 85%;
      text-align: center;
    }
  }

  @media ${DEVICE.laptop} {
    .bg-modal {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .modal-container {
      position: relative;
      width: ${980 / 16}rem;
      height: auto;
      max-width: 95%;
      max-height: 95%;
      overflow-y: auto;
    }
  }

  .container-centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    padding: 0 ${40 / 16}rem;
    margin: 0;
    font-weight: 600;
    font-size: ${40 / 16}rem;
    line-height: ${44 / 16}rem;
  }

  .close-mobile {
    align-self: end;
    cursor: pointer;
  }
`
