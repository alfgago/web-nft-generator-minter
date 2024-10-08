import styled from "styled-components"
import { COLORS } from "@/styles/variables"

export const GroupChatStyles = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: ${450 / 16}rem;
  width: ${420 / 16}rem;

  .container {
    position: absolute;
    right: 0px;
    bottom: 0px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    height: 100%;
    width: 103%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 1rem;
  }
  .chat-container {
    height: 100%;
    width: 100%;
    flex-direction: column;
    display: flex;
  }

  .chat-opts {
    background-color: ${COLORS.black};
    border-top-left-radius: ${10 / 16}rem;
    display: flex;
    position: absolute;
    top: -4.5rem;
    height: 4.5rem;
    right: 0;
    left: 0;
    justify-content: space-between;
    .pn-channel-list {
      display: flex;
      background-color: ${COLORS.black};
    }
    .pn-channel__name {
      color: ${COLORS.white};
    }
    .pn-channel {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:hover {
        background-color: rgba(128, 128, 128, 0.3);
      }
      .pn-channel__description {
        display: none;
      }

      .pn-channel__thumb {
        margin: 0;
        padding-bottom: ${5 / 16}rem;
      }
    }
  }

  .close-button {
    margin-left: ${14 / 16}rem;
    top: 0px;
    right: 0px;
    svg {
      width: 30px;
      height: 30px;
      path {
        fill: ${COLORS.white};
      }
    }
  }
  .chat-button {
    position: absolute;
    border-top-left-radius: 10px;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: #fff;
    font-size: 0.9rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    color: #333;
    span {
      padding-left: 1rem;
    }
    svg {
      position: relative;
      top: 0.1em;
      width: auto;
      height: 1.1em;
    }
  }

  .pn-msg__author {
    white-space: nowrap;
    max-width: ${200 / 16}rem;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bold;
  }

  .pn-msg__time {
    white-space: nowrap;
  }

  .pn-msg__title {
    margin-bottom: 0.25rem;
  }

  .pn-msg-list__emoji-picker {
    display: none;
  }

  .pn-msg-input__emoji-picker {
    left: -2rem;
    bottom: -0.5rem;
  }
  .pn-channel__title {
    max-width: ${100 / 16}rem;
  }
`
