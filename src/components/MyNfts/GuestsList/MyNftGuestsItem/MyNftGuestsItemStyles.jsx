import styled from "styled-components"

export const MyNftGuestsItemStyles = styled.div`
  display: flex;

  flex-direction: column;
  .event-info-cont {
    display: flex;
    align-items: center;
    gap: ${44 / 16}rem;

    div:first-of-type {
      max-width: ${110 / 16}rem;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .location-info-cont {
    p {
      margin: 0;
      font-size: ${28 / 16}rem;
      font-weight: 500;
    }
  }
`
