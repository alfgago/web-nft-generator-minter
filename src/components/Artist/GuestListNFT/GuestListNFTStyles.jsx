import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const GuestListNFTStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  background: linear-gradient(
    270deg,
    #f1ff97 -0.82%,
    rgba(243, 243, 243, 0.9) 52.7%
  );
  .content {
    justify-content: space-between;

    @media ${DEVICE.laptop} {
      display: flex;
    }
  }

  .column2 {
    display: flex;
    flex-direction: column;
  }

  .no-data {
    display: flex;
    flex-direction: column;

    p {
      font-weight: 400;
      font-size: 15px;
    }
  }
`
