import styled from "styled-components"

export const NoDataGuestStyles = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;

  > div {
    h3 {
      font-size: 40px;
    }

    p {
      max-width: ${688 / 16}rem;
      font-size: 36px;
    }

    h2 {
      max-width: ${560 / 16}rem;
    }

    span {
      padding-left: 3rem;
      padding-right: 3rem;
      margin-top: ${48 / 16}rem;
    }
  }
`
