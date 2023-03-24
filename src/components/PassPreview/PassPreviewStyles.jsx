import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const PassPreviewStyles = styled.div`
  position: relative;
  margin-top: 16px;
  padding: 16px 40px;
  background: #eee;

  &.generator {
    width: 640px;
    height: 640px;
    padding: 20px;
    background: transparent;
    margin: 0;
    .inner {
      width: 600px;
      height: 600px;
      .main-image {
        .text {
          font-size: 20px;
        }
      }
      .right {
        .text {
          font-size: 30px;
          padding-right: 30px;
        }
      }
    }
  }

  &.previews {
    padding: 0;
    margin: 0;
  }

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
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        border-radius: 30px;
      }

      .text {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 16px;
        font-size: 16px;
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
        padding-top: 16px;
        margin: auto;
        max-width: 60%;
        height: auto;
      }

      .text {
        padding: 16px;
        font-size: 16px;
        font-weight: bold;
        text-align: right;
      }

      .qr {
        position: absolute;
        bottom: 16px;
        right: 20%;
        max-width: 60%;
        height: auto;
      }
    }
  }
`
