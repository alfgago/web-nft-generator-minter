import styled from "styled-components"

export const MyNtfStyles = styled.main`
  .subt-container {
    padding-bottom: ${70 / 16}rem;
    h3 {
      font-weight: 600;
      text-overflow: ellipsis;
      overflow: hidden;
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

  .edit-profile-button {
    margin: 1rem 0;
    color: #fff;
    border-color: #fff;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .icon {
      margin-left: 0;
      margin-right: 1rem;
    }
  }

  .content {
    padding-bottom: ${32 / 16}rem;
  }

  .content > h1 {
    padding-bottom: ${7 / 16}rem;
  }

  .notfound {
    color: #fff;
  }
`
