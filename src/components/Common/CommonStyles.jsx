import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CommonButton = styled.button`
  position: relative;
  width: 100%;
  max-width: ${250 / 16}rem;
  color: ${COLORS.white};
  background-color: ${COLORS.black};
  font-size: ${20 / 16}rem;
  border-radius: 25px;
  transition: 0.5s ease all;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const CardPassType = styled.div`
  display: flex;
  height: ${250 / 16}rem;
  background: ${COLORS.white};
  box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);

  img {
    width: ${250 / 16}rem;
    height: ${250 / 16}rem;
    object-fit: cover;
  }
`

export const CardDescription = styled.div`
  padding: ${25 / 16}rem ${20 / 16}rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: ${300 / 16}rem;
  h3 {
    font-size: ${28 / 16}rem;
    margin: 0;
    padding: 0;
  }
  .small-title {
    font-size: ${25 / 16}rem;
    font-weight: bold;
  }
  .descriptor {
    font-size: ${18 / 16}rem;
    margin: 0;
    padding: 0;
    > div {
      margin-bottom: 0.5rem;
      padding: 0;
    }
  }
`

export const CardActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 3px;

  .btn {
    border: none;
    font-size: 1rem;
    line-height: ${34 / 16}rem;
    padding: 0 ${20 / 16}rem;
    color: ${COLORS.white};
    min-width: 0;
  }
  .variant {
    background: #858585;
  }
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
    gap: 10px;

    li {
      border-radius: 50px;
      font-weight: 500;
      cursor: pointer;
      transition: 0.5s ease all;
      &.active {
        color: ${COLORS.white};
        padding: ${14 / 16}rem ${25 / 16}rem;
        background: #373737;
        border: 1px solid #454545;
      }
      &:not(.active) {
        padding: ${14 / 16}rem ${25 / 16}rem;
        background: transparent;
        border: ${1 / 16}rem solid #454545;
        border-radius: ${36 / 16}rem;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`
