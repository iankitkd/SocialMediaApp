"use client"

import { useSocket } from "@/hooks/useSocket";

import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"

export default function ChatSection() {
  const socket = useSocket();

  return (
    <div className="w-full h-full flex">
      <ChatList />
      <ChatWindow socket={socket} />
    </div>
  )
}
