import styled from "styled-components"

export const MyNtfStyles = styled.main`
  .subt-container {
    padding-bottom: ${70 / 16}rem;
    h3 {
      font-weight: 600;
    }
    .settings {
      display: flex;
      align-items: center;
      gap: ${10 / 16}rem;
    }
  }

  .content {
    padding-bottom: ${32 / 16}rem;
  }

  .content > h1 {
    padding-bottom: ${7 / 16}rem;
  }
`
