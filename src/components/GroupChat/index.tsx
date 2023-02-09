import React, { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { log } from "console"
import PubNub from "pubnub"
import { PubNubProvider } from "pubnub-react"
import { ReactSVG } from "react-svg"

import { GroupChatStyles } from "@/components/GroupChat/GroupChatStyles"
import pickerData from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import {
  ChannelEntity,
  ChannelList,
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
    userId: "user" + props.userId,
  })

  type ChannelType = ChannelEntity

  const defaultChannel = {
    id: "default",
    name: "Default Channel",
    description: "This is the default channel",
  } as Pick<ChannelType, "id" | "name" | "description">

  const customList = props.setChannels.map((obj: any) => {
    return {
      name: obj.name,
      custom: {
        profileUrl: obj.image,
      },
      description: obj.description,
      eTag: "channel" + Math.random(),
      id: "single." + obj.id,
      updated: new Date(),
    }
  })

  // customList.push(defaultChannel)

  const [currentChannel, setCurrentChannel] = useState(customList[0])

  const [channelList, setChannelList] = useState([])

  const theme = "light"

  if (!props.showChat) return null

  return (
    <GroupChatStyles>
      <div className="container">
        <div className="chat-opts">
          <button
            className="close-button"
            onClick={() => props.setShowChat(!props.showChat)}
          >
            <ReactSVG src="/assets/icons/close.svg" />
          </button>
          <ChannelList
            channels={customList}
            onChannelSwitched={(channel: any) => {
              setCurrentChannel(channel)
            }}
          />
        </div>
        <div className="chat-container">
          <PubNubProvider client={pubnub}>
            <Chat
              currentChannel={
                currentChannel === undefined
                  ? customList[0].id
                  : currentChannel.id
              }
              theme={theme}
            >
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

const ChatIcon = ({ setShowChat, showChat }: any) => {
  if (showChat) return null
  return (
    <GroupChatStyles>
      <button className="chat-button" onClick={() => setShowChat(!showChat)}>
        <ReactSVG src="/assets/icons/message-circle.svg" />
        <span>Messaging</span>
      </button>
    </GroupChatStyles>
  )
}

const GroupChat = ({ userId, type, userEvents }: any) => {
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
    <GroupChatStyles className="group-chat">
      <ChatIcon showChat={showChat} setShowChat={setShowChat} />
      <div ref={ref}>
        <ChatModal
          userId={userId}
          showChat={showChat}
          setShowChat={setShowChat}
          setChannels={userEvents}
        />
      </div>
    </GroupChatStyles>
  )
}

export default GroupChat
