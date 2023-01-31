import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const TeamStyles = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .row1:before {
    z-index: -1;
    top: 0;
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 61%;
    right: -20px;
    background: linear-gradient(
      94.68deg,
      #f9e9ff 3.08%,
      rgba(255, 255, 255, 0) 88.15%,
      rgba(255, 255, 255, 0) 88.15%
    );
    left: -24%;
  }

  .row2:before {
    z-index: -1;
    top: 0;
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 61%;
    right: -20px;
    background: linear-gradient(
      94.68deg,
      #e9f3ff 3.08%,
      rgba(255, 255, 255, 0) 88.15%,
      rgba(255, 255, 255, 0) 88.15%
    );
    transform: rotate(-180deg);
    right: -24%;
  }
`

export const AboutTeamStyles = styled.div`
  display: flex;
  align-items: center;
  gap: ${154 / 16}rem;
  padding-bottom: ${96 / 16}rem !important;
`
export const TeamListStyles = styled.div`
  display: flex;
  align-items: center;
  gap: ${33 / 16}rem;
  row-gap: ${100 / 16}rem;
  flex-wrap: wrap;
`
