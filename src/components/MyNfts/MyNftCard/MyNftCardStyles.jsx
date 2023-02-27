import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const MyNftCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0;
  width: 50%;
  @media ${DEVICE.laptop} {
    width: calc(36% - ${129 / 16}rem);
  }

  .head-cont {
    background-color: ${COLORS.black};
    padding: ${14 / 16}rem;
    height: ${65 / 16}rem;

    @media ${DEVICE.laptop} {
      height: 5.5rem;
      padding: ${20 / 16}rem ${34 / 16}rem;
    }

    h3 {
      font-weight: 500;

      font-size: ${15 / 16}rem;
      @media ${DEVICE.laptop} {
        font-size: ${23 / 16}rem;
      }
    }

    p,
    h3 {
      margin: 0px;
      color: ${COLORS.white};
    }
  }

  .content-cont {
    background-color: #f3f3f3;
    padding: ${14 / 16}rem;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .info-cont {
      display: flex;
      padding-top: ${15 / 16}rem;
      justify-content: space-between;
    }
  }
`
