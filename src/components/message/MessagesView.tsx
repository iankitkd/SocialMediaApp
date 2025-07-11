import { useEffect, useRef, useState } from 'react'

import MessageContent from './MessageContent';
import { useSelectedUserStore } from '@/store/selectedUserStore';
import { Message } from '@/types/message';
import { MySocket } from '@/types/socket';
import { useUserStore } from '@/store/userStore';
import apiRequest from '@/lib/apiRequest';
import MessageSkeleton from './MessageSkeleton';

export default function MessagesView({socket, isTemporaryMessage}: {socket: MySocket, isTemporaryMessage: boolean}) {
  const { _id: receiverId } = useSelectedUserStore();
  const { _id: userId, username } = useUserStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const roomId = [userId, receiverId].sort().join('_');
    const concatStr = isTemporaryMessage ? "_temp" : "";
    const currentRoomId = `${roomId}${concatStr}`;

    async function setChatHistory() {
      if(receiverId) {
        setMessagesLoading(true);
        try {
          const {messages} = await apiRequest(`/api/messages`, "POST", {data: {receiverId}});
          setMessages(messages);
        } catch (error) {

        } finally {
          setMessagesLoading(false);
        }
      }
    }

    if (socket) {
      if(isTemporaryMessage) {
        socket.emit('joinTempRoom', {roomId, username});
        setMessages([]);
      } else {
        socket.emit('leaveTempRoom', {roomId, username});
        socket.emit('joinRoom', roomId);
        setChatHistory();
      }
      socket.on('receiveMessage', (message) => {
        if (message.roomId === currentRoomId || (message.roomId === roomId && message.type === "system")) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('receiveMessage');
      }
    };
  }, [socket, receiverId, isTemporaryMessage]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     scrollToBottom();
  //   };
  //   window.visualViewport?.addEventListener("resize", handleResize);
  //   return () => window.visualViewport?.removeEventListener("resize", handleResize);
  // }, []);


  let previousDateStr: string | null = null;

  return (
    <div className='flex-1 flex-col py-2 px-4 overflow-y-auto'>
      { 
        messagesLoading ? (
          <MessageSkeleton />
        ) : messages.length > 0 && messages.map((message, i) => {
            const currentDateStr = new Date(message.createdAt).toDateString();
            let displayDate = null;
            if (!previousDateStr || currentDateStr !== previousDateStr) {
              displayDate = currentDateStr;
              previousDateStr = currentDateStr;
            }
              
            if(displayDate !== null) {
              return (
                <div key={message._id || i}>
                  <div className='w-fit px-3 py-1 justify-self-center bg-secondary text-secondary-foreground rounded-full'>{displayDate}</div>
                  <MessageContent 
                    key={message._id || i} 
                    message={message} 
                    isOwnMessage={message.senderId === userId}
                  />
                </div>
              )
            }
            
            return (
              <MessageContent 
                key={message._id || i} 
                message={message} 
                isOwnMessage={message.senderId === userId}
              />
            )
        })
      }
      <div ref={messagesEndRef} />
    </div>
  )
}
