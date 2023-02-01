import styled from "styled-components"
import { COLORS } from "@/styles/variables"

export const GroupChatStyles = styled.section`
  .groupChat {
    position: absolute;
    right: 50px;
    bottom: 250px;
    height: 550px;
    max-height: 550px;
    width: 350px;
    max-width: 350px;
  }
  .container {
    position: absolute;
    right: 0px;
    bottom: 0px;
    border-radius: 20px;
    border: 2px solid ${COLORS.black};
    background-color: #ddd;
    height: 550px;
    max-height: 550px;
    width: 350px;
    max-width: 350px;
    display: flex;
    align-items: center; 
    align-content: center; 
    justify-content: center;
  }
  .chat-container {
    height: 500px;
    width: 300px;
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
  }
  .chat-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    svg {
        width: 50px;
        height: 50px;
    }
  }
`
