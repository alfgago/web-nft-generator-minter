import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"
export const EditProfileFormStyles = styled.div`
  padding-top: ${20 / 16}rem;

  .buttons {
    width: 100%;
    text-align: right;
  }

  .success {
    text-align: center;
    svg {
      width: 5rem;
      height: 5rem;
      margin-bottom: 1rem;
      path {
        color: green;
      }
      polyline {
        stroke: green;
      }
    }
    font-size: 2rem;
  }

  form {
    text-align: left;
    .full {
      width: 100%;
    }
    .members-title {
      margin-bottom: 0.5rem;
    }
  }

  .members-container {
    width: 100%;
    border: 1px solid #999;
    padding: 1rem;
    margin-bottom: 1.5rem;

    .members-item {
      display: flex;
      border-bottom: 1px solid #eee;
      margin-bottom: 1rem;
      label {
        width: auto;
        padding: 0.5rem;
        margin-bottom: 0;
        input[type="file"] {
          background: none;
          border: none;
          font-size: 1rem;
        }
      }
      .alert {
        position: absolute;
        top: 0;
      }
    }
    button {
      color: #fff;
      background: #111;
      border: 1px solid #111;
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 12px;
      margin: auto;
    }

    .image-field {
      display: flex;
      input {
        max-width: 250px;
      }
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
  }
`
