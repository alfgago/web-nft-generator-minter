import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"

export const MyNftGuestsListStyles = styled.section`
  padding-top: 0;
  padding-bottom: ${49 / 16}rem;

  .content {
    h2 {
      font-weight: 600;
      font-size: 40px;
      padding-bottom: ${61 / 16}rem;
    }
  }
  .items-cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .items-cont + div {
    margin-top: ${45 / 16}rem;
  }
`
