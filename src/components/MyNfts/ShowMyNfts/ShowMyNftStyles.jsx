import styled from "styled-components"

export const ShowMyNftStyles = styled.section`
  background-color: transparent;
  padding-top: 0;
  padding-bottom: ${49 / 16}rem;
  margin-top: -5.5rem;
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: ${129 / 16}rem;
    justify-content: center;
  }

  .content + div {
    margin-top: ${20 / 16}rem;
  }
`
