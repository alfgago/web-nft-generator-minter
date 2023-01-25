import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const SuggestedArtistsStyles = styled.section`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  background: linear-gradient(
    270deg,
    #d8f5fe 10%,
    rgba(255, 255, 255, 0.9) 100%
  );

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h2 {
      margin-bottom: 2.5rem;
    }
  }

  .iyXsqs .list {
    width: 100%;
    max-width: 43.75rem;

    @media ${DEVICE.laptop} {
      max-width: 100%;
    }
  }

  .iyXsqs .content {
    width: 100%;
    align-items: center;

    @media ${DEVICE.laptop} {
    }
  }
`
