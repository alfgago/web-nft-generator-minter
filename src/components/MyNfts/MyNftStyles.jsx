import styled from "styled-components"

export const MyNtfStyles = styled.main`
  .subt-container {
    padding-bottom: ${70 / 16}rem;
    h3 {
      font-weight: 600;
    }
    .disconnect {
      button {
        font-size: ${12 / 16}rem;
        align-items: center;
        gap: ${10 / 16}rem;
        text-decoration: underline;
      }
    }
  }

  .disconnected {
    .with-icon {
      display: flex;
      gap: ${10 / 16}rem;
      align-items: center;

      &:hover path {
        fill: #fff;
      }
    }
  }

  .content {
    padding-bottom: ${32 / 16}rem;
  }

  .content > h1 {
    padding-bottom: ${7 / 16}rem;
  }
`
