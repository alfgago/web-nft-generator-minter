import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const MyNftCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  width: calc(50% - 1rem);
  margin-bottom: 0;
  @media ${DEVICE.laptop} {
    width: calc(25% - 1.5rem);
  }

  .head-cont {
    background-color: ${COLORS.black};
    padding: ${14 / 16}rem;

    @media ${DEVICE.laptop} {
      padding: ${20 / 16}rem ${34 / 16}rem;
    }

    h3 {
      font-weight: 500;
      padding-bottom: ${2 / 16}rem;
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

    .clickable {
      background: none;
    }

    .info-cont {
      display: flex;
      padding-top: ${15 / 16}rem;
      justify-content: space-between;
    }
  }
`
