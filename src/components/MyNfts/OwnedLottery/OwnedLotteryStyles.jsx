import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const OwnedLotteryStyles = styled.section`

  .active-filter{
    border-bottom: ${3 / 16}rem solid;
    padding-bottom: ${5 / 16}rem;
  }

  .header-cont {
    display: block;
    gap: 6rem;
    padding-bottom: ${69 / 16}rem;
    @media ${DEVICE.laptop} {
      display: flex;
    }

    align-items: center;

    .filters {
        display: flex;
        gap: ${24 / 16}rem;
        padding-left: 0;
        @media ${DEVICE.laptop} {
          gap: ${60 / 16}rem;
          padding-left: 1rem;
        }

        li {
          font-size: 1rem;
          font-weight: 500;
          list-style-type: none;
          cursor: pointer;
          @media ${DEVICE.laptop} {
            font-size: ${32 / 16}rem;
          }
        }
  }
`
