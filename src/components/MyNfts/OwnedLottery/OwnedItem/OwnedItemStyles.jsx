import styled from "styled-components"

export const OwnedItemStyles = styled.div`
  display: flex;
  margin-bottom: ${62 / 16}rem;

  h3 {
    font-size: ${28 / 16}rem;
  }

  .grey-card {
    background-color: #f3f3f3;
    padding: ${24 / 16}rem ${38 / 16}rem;
  }

  .half-cont {
    display: flex;
    width: 50%;

    .image {
      max-width: ${224 / 16}rem;
      width: 100%;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .nft-info-cont {
      width: 100%;
      h3 {
        padding-bottom: ${61 / 16}rem;
      }

      p {
        font-weight: 700;
        margin: 0;
        font-size: ${24 / 16}rem;
      }
    }

    .event-infto-cont {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .owned-info-cont {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      p {
        margin: 0;
        font-size: ${20 / 16}rem;
        span {
          font-weight: bold;
        }
      }
    }
  }
`
