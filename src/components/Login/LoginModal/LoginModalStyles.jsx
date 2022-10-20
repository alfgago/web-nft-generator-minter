import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LoginModalStyles = styled.section`
  display: flex;
  z-index: 1;
  position: fixed;

  background: ${COLORS.white};
  color: ${COLORS.black};
  justify-content: center;
  align-items: center;
  left: 0;
  top: 5rem;
  padding: 0;
  width: 100%;
  height: calc(100% - 5rem);
  z-index: 1000;

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
    padding: 3rem 0;
    padding-top: 5rem;

    @media ${DEVICE.laptop} {
      height: 100%;
      border-radius: ${12 / 16}rem;
      margin-top: -3rem;
    }

    a {
      color: #717171;
    }
  }

  .modal-header {
    position: relative;
    content: "";
    background-color: ${COLORS.black};
    color: ${COLORS.white};
    padding: 3rem 0;

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
      width: ${780 / 16}rem;
      height: auto;
      max-width: 95%;
      max-height: 95%;
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
    font-weight: 700;
    font-size: ${40 / 16}rem;
    line-height: ${44 / 16}rem;
  }
`
