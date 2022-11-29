import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CommonPill = styled.span`
  position: relative;
  display: inline-block;
  text-align: center;
  color: ${COLORS.black};
  border: 2px solid #454545;
  border-radius: 50px;
  transition: 0.5s ease all;
  cursor: pointer;
  font-size: 16px;
  line-height: 16px;
  padding: 10px 15px;
  font-weight: 500;
  white-space: nowrap;

  &.small {
    font-size: 13px;
    line-height: 16px;
    padding: 8px 12px;
  }

  @media ${DEVICE.laptop} {
    font-size: ${24 / 16}rem;
    line-height: ${26 / 16}rem;
    padding: ${10 / 16}rem ${30 / 16}rem;

    &.small {
      font-size: ${18 / 16}rem;
      line-height: ${20 / 16}rem;
      padding: ${7 / 16}rem ${15 / 16}rem;
    }
  }

  &.fill {
    background-color: #373737;
    border: 2px solid #373737;
    color: ${COLORS.white};
  }

  &.clickable:hover {
    background-color: ${COLORS.black};
    color: ${COLORS.white};
  }

  &.purple {
    color: #fff;
    background: #910ae2;
    border: 2px solid #910ae2;
    &:hover {
      color: #910ae2;
      background: #fff;
    }
  }

  &.blue {
    color: #fff;
    background: #1415ff;
    border: 2px solid #1415ff;
    &:hover {
      color: #1415ff;
      background: #fff;
    }
  }

  &.lightblue {
    background: #00ecff;
    border: 2px solid #00ecff;
    &:hover {
      color: #00ecff;
      background: #fff;
    }
  }

  &.yellow {
    color: #000;
    background: #e0f368;
    border: 2px solid #e0f368;
    &:hover {
      background: #fff;
    }
  }

  &.pink {
    color: #fff;
    background: #fb00fb;
    border: 2px solid #fb00fb;
    &:hover {
      color: #fb00fb;
      background: transparent;
    }
  }
`

export const AddButtonStyle = styled.button`
  display: flex;
  background-color: #777777;
  border-radius: 49px;
  border: none;
  align-items: center;
  padding: ${10 / 16}rem ${16 / 16}rem;
  color: #fff;

  span {
    padding: 0px 12px;
  }
`

export const Pagination = styled.div`
  ul {
    margin: 0;
    padding: 0;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    gap: 5px;
    list-style: none;

    .page-link {
      padding: 5px 6px;
      background-color: #d9d9d9;
      width: ${20 / 16}rem;
      height: ${20 / 16}rem;
    }
    .active {
      color: ${COLORS.white};
      background-color: #4d4d4d;
    }
  }
`
