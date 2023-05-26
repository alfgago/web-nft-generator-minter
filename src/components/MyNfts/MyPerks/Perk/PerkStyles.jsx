import styled from "styled-components"

export const PerkStyles = styled.div`
  position: relative;
  display: flex;
  color: #fff;
  margin-top: 2rem;
  align-items: center;
  gap: 40px;

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    svg {
      fill: #fff;
    }
  }

  .image {
    max-width: 100px;
    img {
      width: 100%;
      height: auto;
    }
  }

  .perks-title,
  .perks .left {
    display: none;
  }
`
