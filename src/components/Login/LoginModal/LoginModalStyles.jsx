import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LoginModalStyles = styled.section`
  display: flex;
  z-index: 1;
  position: fixed;
  color: ${COLORS.white};
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0;

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
    max-width: 95%;
    max-height: 95%;
  }

  .container-centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: ${COLORS.white};
    width: 100%;
    border-radius: ${12 / 16}rem;
    margin-top: -3rem;
    padding: 3rem 0;
    padding-top: 5rem;
  }

  .modal-header {
    border-top-left-radius: ${8 / 16}rem;
    border-top-right-radius: ${8 / 16}rem;
    position: relative;
    content: "";
    background: url("/assets/img/login-header.svg") no-repeat;
    background-size: cover;
    object-fit: cover;
    background-position: left center;
    padding: 1.5rem 0;
  }

  .title {
    padding: 0 ${40 / 16}rem;
    margin: 0;
    font-weight: 700;
    font-size: ${40 / 16}rem;
    line-height: ${44 / 16}rem;
  }
`
