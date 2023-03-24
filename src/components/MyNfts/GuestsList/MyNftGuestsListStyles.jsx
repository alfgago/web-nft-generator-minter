import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"

export const MyNftGuestsListStyles = styled.section`
  background: #111;

  .content {
    h2 {
      font-weight: 600;
      font-size: 40px;
      padding-bottom: ${61 / 16}rem;
      color: #fff;
    }
  }
  .items-cont {
    display: flex;
    align-items: center;
    gap: ${87 / 16}rem;
  }

  .items-cont + div {
    margin-top: ${45 / 16}rem;
  }
`
