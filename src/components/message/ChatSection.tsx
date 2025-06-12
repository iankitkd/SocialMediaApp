"use client"

import { useSocket } from "@/hooks/useSocket";

import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"
import { Conversation } from "@/lib/types/message";

export default function ChatSection({conversations}: {conversations: Conversation[]}) {
  const socket = useSocket();

  return (
    <div className="w-full h-full flex">
      <ChatList conversations={conversations} />
      <ChatWindow socket={socket} />
    </div>
  )
}
