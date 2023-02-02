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
    right: -20px;
    background: linear-gradient(
      94.68deg,
      #f9e9ff 3.08%,
      rgba(255, 255, 255, 0) 88.15%,
      rgba(255, 255, 255, 0) 88.15%
    );
    left: -24%;
    height: 100%;
    @media ${DEVICE.laptop} {
      height: 26rem;
    }
  }

  .row2:before {
    z-index: -1;
    top: 0;
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    right: -20px;
    background: linear-gradient(
      94.68deg,
      #e9f3ff 3.08%,
      rgba(255, 255, 255, 0) 88.15%,
      rgba(255, 255, 255, 0) 88.15%
    );
    transform: rotate(-180deg);
    right: -24%;
    height: 100%;
    @media ${DEVICE.laptop} {
      height: 26rem;
    }
  }
`

export const AboutTeamStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${60 / 16}rem !important;

  @media ${DEVICE.laptop} {
    padding-bottom: ${96 / 16}rem !important;
    gap: ${154 / 16}rem;
    flex-direction: row;
    align-items: center;
  }
`
export const TeamListStyles = styled.div`
  display: flex;
  align-items: center;
  gap: ${33 / 16}rem;
  flex-wrap: wrap;
  /* row-gap: ${5 / 16}rem; */
  justify-content: center;
  flex-direction: column;

  @media ${DEVICE.laptop} {
    justify-content: start;
    row-gap: ${100 / 16}rem;
    flex-direction: row;
  }
`
