import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

const fontSize = "1rem"

export const TourFilterStyles = styled.div`
    background-color: #0c0c0c;
    padding 10px 0px;
  
    li {
    font-size: 1rem;
    }

  .top-triangle {
    background: url("/assets/img/triangle-top-tour.svg") no-repeat;
    background-size: cover;
    object-fit: cover;
    background-position: center top;
    padding: 2rem 0rem;
    width: 100%;
    position: absolute;
    top: 8.6rem;

    @media (${DEVICE.laptop}) {
    }
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

    @media (${DEVICE.laptop}) {
        justify-content: flex-start;
    }
  }

  .wrapper{
    padding: 0rem 5rem 4rem 5rem;
    align-items: center;
  }
`
