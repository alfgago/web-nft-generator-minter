import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"
export interface Props {
  dropWidth: any
}
export const DropItemStyles = styled.div<Props>`
  width: 100%;
  max-width: 40rem;

  @media ${DEVICE.laptop} {
    max-width: none;
  }

  .drop-container {
    border: ${1 / 16}rem solid ${COLORS.black};
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 40rem;
    flex-wrap: wrap;

    @media ${DEVICE.laptop} {
      max-width: ${(props) => props.dropWidth};
    }

    .unc-content {
      width: 90%;

      button {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }

    .unc-content + div {
      width: 10%;
    }
  }

  .bg-opned {
    background-color: ${COLORS.white};
  }
`
