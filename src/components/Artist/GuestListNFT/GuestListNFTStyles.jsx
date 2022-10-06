import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const GuestListNFTStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  background: linear-gradient(
    270deg,
    #f1ff97 -0.82%,
    rgba(243, 243, 243, 0.9) 52.7%
  );
  .content {
    justify-content: space-between;

    @media ${DEVICE.laptop} {
      display: flex;
    }
  }

  .column2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const CardPassType = styled.div`
  display: flex;
  height: ${280 / 16}rem;
  background: ${COLORS.white};
  box-shadow: ${0 / 16}rem ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);

  img {
    width: ${280 / 16}rem;
    height: ${280 / 16}rem;
    object-fit: cover;
  }
`

export const CardDescription = styled.div`
  padding: ${35 / 16}rem ${27 / 16}rem ${35 / 16}rem ${27 / 16}rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    font-size: ${30 / 16}rem;
    margin: 0;
    padding: 0;
  }
  ul {
    font-size: ${20 / 16}rem;
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      margin: ${0 / 16}rem ${0 / 16}rem ${10 / 16}rem ${0 / 16}rem;
      padding: 0;
    }
  }
  button {
    border: none;
    font-size: ${17 / 16}rem;
    line-height: ${19 / 16}rem;
    padding: ${10 / 16}rem ${34 / 16}rem;
    margin: ${0 / 16}rem ${2 / 16}rem;
    color: ${COLORS.white};
    font-weight: 700;
    background: #373737;
    border-radius: ${29 / 16}rem;
    :hover {
      background: #858585;
      cursor: pointer;
    }
  }
  .variant {
    background: #858585;
  }
`

export const CardActions = styled.div`
  display: flex;
`

export const PassTypeList = styled.div`
  width: ${427 / 16}rem;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    .active {
      margin: ${5 / 16}rem ${6 / 16}rem;
      font-weight: 600;
      color: ${COLORS.white};
      padding: ${14 / 16}rem ${25 / 16}rem;
      background: #373737;
      border: 1px solid #454545;
      border-radius: ${69 / 16}rem;
    }
    > li:first-child {
      margin: ${5 / 16}rem ${6 / 16}rem ${5 / 16}rem 0;
    }
    > li:not(.active) {
      font-weight: 600;
      margin: ${5 / 16}rem ${6 / 16}rem;
      padding: ${14 / 16}rem ${25 / 16}rem;
      background: transparent;
      border: ${1 / 16}rem solid #454545;
      border-radius: ${36 / 16}rem;
    }
  }
`
