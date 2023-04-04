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

    .inner .main-image:after {
      width: 50px;
      height: 8px;
      margin-left: -25px;
    }
  }

  &.golden {
    .inner {
      .right {
        .text {
          position: absolute;
          top: 50%;
        }
      }
    }
    .bg {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-bottom-left-radius: 30px;
      border-top-left-radius: 30px;
      overflow: hidden;
      &:before {
        background-image: url("/assets/img/gold-bg.jpg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center right;
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      &:after {
        content: "";
        background: #fff;
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50%;
      }
    }
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
      :before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        content: "";
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.4) 60%,
          rgba(0, 0, 0, 0) 100%
        );
        z-index: 1;
        border-radius: 30px;
      }
      :after {
        content: "";
        position: absolute;
        top: 14px;
        left: 50%;
        width: 100px;
        background: #fff;
        height: 14px;
        margin-left: -50px;
        border-radius: 50px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
      }
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
        z-index: 1;
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

  img {
    pointer-events: none;
  }
`
