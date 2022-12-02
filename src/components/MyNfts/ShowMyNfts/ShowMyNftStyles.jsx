import styled from "styled-components"

export const ShowMyNftStyles = styled.section`
  background-color: transparent;
  padding-top: 0;
  margin-top: -5.5rem;
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: ${20 / 16}rem;
  }

  .content + div {
    margin-top: ${20 / 16}rem;
  }
`