import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const PassPreviewStyles = styled.div`
  position: relative;
  margin-top: 1rem;
  padding: 1rem 3rem;
  background: #eee;

  .inner {
    background: #fff;
    position: relative;
    width: 300px;
    height: 300px;
    margin: auto;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;

    .main-image {
      position: relative;
      height: 100%;
      width: 75%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        border-radius: 30px;
      }

      .text {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        font-size: 0.9rem;
        font-weight: bold;
        text-align: left;
        color: #fff;
      }
    }

    .right {
      position: absolute;
      top: 0;
      right: 0;
      width: 25%;
      height: 100%;

      .p1-vert {
        display: block;
        position: relative;
        padding-top: 1rem;
        margin: auto;
        max-width: 60%;
      }

      .text {
        padding: 0.25rem 1rem;
        font-size: 0.75rem;
        font-weight: bold;
        text-align: right;
      }

      .qr {
        position: absolute;
        bottom: 1rem;
        right: 20%;
        max-width: 60%;
      }
    }
  }
`
