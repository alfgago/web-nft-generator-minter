import React, { useEffect, useRef, useState } from "react"
import PubNub from "pubnub"
import { PubNubProvider } from "pubnub-react"
import { ReactSVG } from "react-svg"

import { GroupChatStyles } from "@/components/GroupChat/GroupChatStyles"
import pickerData from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import {
  Chat,
  MessageInput,
  MessageList,
  MessagePayload,
  TypingIndicator,
} from "@pubnub/react-chat-components"

const ChatModal = (props: any) => {
  const pubnub = new PubNub({
    publishKey: "pub-c-d8a00ae2-e3f9-453b-9f71-c90069a72351",
    subscribeKey: "sub-c-74dfeb98-4fe0-4319-b7c1-e9e3fd5f007a",
    userId: "myFirstUser",
  })
  const currentChannel = "Default"
  const theme = "light"

  if (!props.showChat) return null
  return (
    <GroupChatStyles>
      <div className="container">
        <button
          className="close-button"
          onClick={() => props.setShowChat(!props.showChat)}
        >
          <ReactSVG src="/assets/icons/close.svg" />
        </button>

        <div className="chat-container">
          <PubNubProvider client={pubnub}>
            <Chat {...{ currentChannel, theme }}>
              <MessageList
                fetchMessages={25}
                enableReactions={true}
                reactionsPicker={<Picker data={pickerData} theme={theme} />}
              />
              <TypingIndicator />
              <MessageInput
                typingIndicator
                fileUpload="image"
                placeholder={"Send message"}
                emojiPicker={<Picker data={pickerData} theme={theme} />}
              />
            </Chat>
          </PubNubProvider>
        </div>
      </div>
    </GroupChatStyles>
  )
}

const ChatIcon = (props: any) => {
  if (props.showChat) return null
  return (
    <GroupChatStyles>
      <button
        className="chat-button"
        onClick={() => props.setShowChat(!props.showChat)}
      >
        <ReactSVG src="/assets/icons/message-circle.svg" />
      </button>
    </GroupChatStyles>
  )
}

const GroupChat: React.FC<{}> = () => {
  const [showChat, setShowChat] = useState<any>(false)
  const ref = useRef<any>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowChat(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  return (
    <GroupChatStyles>
      <div className="groupChat">
        <ChatIcon showChat={showChat} setShowChat={setShowChat} />
        <div ref={ref}>
          <ChatModal showChat={showChat} setShowChat={setShowChat} />
        </div>
      </div>
    </GroupChatStyles>
  )
}

export default GroupChat
