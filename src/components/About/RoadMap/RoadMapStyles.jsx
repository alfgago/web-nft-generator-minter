import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const RoadMapStyles = styled.section`
  .cols-cont {
    display: flex;
  }

  .column {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  .col-1 {
    align-items: flex-start;
  }
  .col-2 {
    align-items: flex-end;
  }
`
