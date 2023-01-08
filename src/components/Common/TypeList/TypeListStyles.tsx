import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const TypeListStyles = styled.div`
  width: ${427 / 16}rem;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;

  ul {
    list-style: none;
    margin-left: -2rem;
    padding: 0 2rem;
    width: 100vw;
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 15px;
    ::-webkit-scrollbar {
      display: none;
    }
    flex-wrap: wrap;

    @media ${DEVICE.laptop} {
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    li {
      border-radius: 50px;
      font-weight: 500;
      cursor: pointer;
      transition: 0.5s ease all;
      &.active {
        .clickable {
          color: ${COLORS.white};
          background: #373737;
        }
      }
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`
