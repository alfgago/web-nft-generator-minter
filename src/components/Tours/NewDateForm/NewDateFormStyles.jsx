import { COLORS, DEVICE } from "@/styles/variables"
import styled from "styled-components"
export const NewDateFormStyles = styled.div`
  padding-top: ${20 / 16}rem;

  p {
    text-align: center;
    font-weight: 500;g-top: ${20 / 16}rem;
    }
  }

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
    .full {
      width: 100%;
    }
    label.image input{
      background: none;
      border: none;
    }
    .description {
      padding-left: 1.5rem;
      color: #999;
      font-size: .75rem;
      font-weight: 400;
    }
    .location-picker {
      position: relative;
      input {
        color: #000;
        ::placeholder {
          color: #000;
        }
      }
      ul {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        margin-top: -1rem;
        padding-top: 1rem;
        color: #000;
        background: #eee;
        border: 2px solid #eee;
        list-style: none;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        overflow: hidden;
        li {
          width: 100%;
          font-size: 0.75rem;
          background: #fff;
          padding: 0.25rem 1.5rem;
          cursor: pointer;
          &:hover {
            background: #dfe7ff;
          }
          &:last-of-type {
            padding-bottom: 1rem;
          }
        }
      }
    }
  }
`
