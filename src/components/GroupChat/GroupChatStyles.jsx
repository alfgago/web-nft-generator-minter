import styled from "styled-components"
import { COLORS } from "@/styles/variables"

export const GroupChatStyles = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: ${450 / 16}rem;
  width: ${350 / 16}rem;

  .container {
    position: absolute;
    right: 0px;
    bottom: 0px;
    border-top-left-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    height: 100%;
    width: 100%;
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
  .close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    svg {
      width: 30px;
      height: 30px;
    }
    z-index: 9;
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
`
