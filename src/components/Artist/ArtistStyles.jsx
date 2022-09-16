import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistStyles = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;
  background: #000;
  main {
    display: flex;
    justify-content: space-around;
    max-width: 1728px;
    margin: 0 auto;
    padding: ${32 / 16}rem 0;
    background: linear-gradient(
      270deg,
      #f1ff97 -0.82%,
      rgba(243, 243, 243, 0.9) 52.7%
    );
  }

  h1 {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    .active {
      margin: 5px 6px;
      font-weight: 600;
      color: #fff;
      padding: 14px 25px;
      background: #373737;
      border: 1px solid #454545;
      border-radius: 69px;
    }
    > li:first-child {
      margin: 5px 6px 5px 0px;
    }
    > li:not(.active) {
      font-weight: 600;
      margin: 5px 6px;
      padding: 14px 25px;
      background: transparent;
      border: 1px solid #454545;
      border-radius: 36px;
    }
  }

  @media ${DEVICE.laptop} {
    font-size: ${16 / 16}rem;
  }
`

export const FaqStyles = styled.div`
  position: relative;
  width: 100%;
  height: 557px;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;
  background: #000;

  .faqContainer {
    display: flex;
    height: 557px;
    justify-content: space-around;
    max-width: 1728px;
    margin: 0 auto;
    padding: ${32 / 16}rem 0;
    background: linear-gradient(
      270deg,
      #d8f5fe 8.41%,
      rgba(255, 255, 255, 0.9) 88.16%
    );
  }
`
export const ContainerPage = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;
  background: #000;
  .content {
    background: #fff;
    max-width: 1728px;
    margin: 0 auto;
  }
`
