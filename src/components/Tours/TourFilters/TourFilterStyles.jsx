import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const TourFilterStyles = styled.section`
    background-color: #0c0c0c;
    padding: 2rem 0;
  
    li {
      font-size: 1rem;
    }

   .filters {
    display: flex;
    flex-direction: row;
    color: #fff;
    list-style-type: none;
    justify-content: space-between;
    text-decoration: underline;
    padding 0px;
    align-items: center;

    li {
      cursor: pointer;
      margin-right: 1rem;
    }

    @media (${DEVICE.laptop}) {
        justify-content: flex-start;
    }
  }
  
`
