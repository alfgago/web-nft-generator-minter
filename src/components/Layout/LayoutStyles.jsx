import styled from "styled-components"

export const LayoutStyles = styled.div`
  position: relative;

  &.slug-password-protect {
    min-height: 100vh;
    background: #000;
    .navbar,
    .footer {
      display: none;
    }
  }
`
