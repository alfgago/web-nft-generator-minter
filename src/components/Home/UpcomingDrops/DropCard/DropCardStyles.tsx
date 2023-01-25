import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const DropCardStyles = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background: ${COLORS.white};
  box-shadow: 0 ${4 / 16}rem ${32 / 16}rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;

  @media ${DEVICE.laptop} {
    &.home {
      display: block;
      .image-container {
        width: 100%;
        padding-bottom: 100%;
      }
      .inner {
        position: absolute;
        padding: 0 !important;
        top: 0;
        right: 0;
        display: inline-flex;
        flex-direction: column;
        border-bottom-left-radius: 50px;
        transition: 0.5s ease all;

        .titles {
          text-align: right;
          color: #fff;
          width: 100%;
          transition: 0.5s ease all;
          padding: 1rem;
          padding-top: 0;
          opacity: 0;
          order: 2;
        }
        .actions {
          padding: 1rem;
          text-align: center;
          .time {
            color: #fff;
            margin-top: 0.5rem;
          }

          &.with-time {
            display: block;
          }
        }
      }
      &:hover {
        .inner {
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          .titles {
            opacity: 1;
          }
        }
      }
    }
  }

  .image-container {
    position: relative;
    height: 0;
    width: 45%;
    padding-bottom: 45%;
    img {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media ${DEVICE.laptop} {
      width: 50%;
      padding-bottom: 50%;
    }
  }

  .inner {
    width: 55%;
    padding: 10px 10px;
    color: #000;

    @media ${DEVICE.laptop} {
      width: 50%;
      padding: ${25 / 16}rem ${20 / 16}rem;
    }

    .title {
      font-size: ${20 / 16}rem;
      font-weight: 600;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${20 / 16}rem;
      }
    }

    .type {
      font-size: ${14 / 16}rem;
      font-weight: 500;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${18 / 16}rem;
      }
    }

    .price {
      font-size: ${18 / 16}rem;
      font-weight: 400;
      margin-bottom: 1rem;
      @media ${DEVICE.laptop} {
        font-size: ${20 / 16}rem;
      }
    }

    .actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: ${10 / 16}rem;

      .clickable {
        @media ${DEVICE.maxlaptop} {
          font-size: ${11 / 16}rem;
          padding: 3px 5px;
        }
        @media ${DEVICE.laptop} {
          &:hover {
            color: #fff;
            border-color: #fff;
          }
        }
      }
    }

    .time {
      display: block;
      font-size: ${11 / 16}rem;
      color: #000;
      @media ${DEVICE.maxlaptop} {
        font-size: ${11 / 16}rem;
      }
    }
  }
`
