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

  .bg-modal {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
  }

  .modal-container {
    width: ${780 / 16}rem;
    height: ${480 / 16}rem;
    position: absolute;
    flex: 1;
  }

  .container-centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: ${COLORS.white};
    width: 100%;
    height: ${480 / 16}rem;
    border-radius: ${12 / 16}rem;
    margin-top: -55px;
  }

  .modal-header {
    border-top-left-radius: ${8 / 16}rem;
    border-top-right-radius: ${8 / 16}rem;
    position: relative;
    content: "";
    height: ${114 / 16}rem;
    background: url("/assets/img/login-header.svg") no-repeat;
    background-size: cover;
    object-fit: cover;
    background-position: left center;
  }

  .title {
    padding: 0 ${40 / 16}rem;
    margin: 0;
    font-weight: 700;
    font-size: ${40 / 16}rem;
    line-height: ${44 / 16}rem;
  }
`
