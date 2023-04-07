import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"
export const EditPerksFormStyles = styled.div`
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

  .icon-field {
    display: flex;
    align-items: center;
    select {
      width: calc(100% - 3rem);
      font-size: 0.8rem;
      padding: 1rem 0.5rem;
      min-width: 9rem;
    }
    .selected-icon {
      text-align: center;
      width: 3rem;
      svg {
        position: relative;
        top: 3px;
        width: 2rem;
        height: 2rem;
        display: inline-block;
      }
    }
  }

  form {
    text-align: left;
    .full {
      width: 100%;
    }
    .perks-title {
      margin-bottom: 0.5rem;
    }
  }

  .perks-container {
    width: 100%;
    border: 1px solid #999;
    padding: 1rem;
    margin-bottom: 1.5rem;

    .perk-item {
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
        right: 0;
        max-width: 60%;
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
