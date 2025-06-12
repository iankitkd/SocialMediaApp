import { useEffect, useRef, useState } from 'react'

import MessageContent from './MessageContent';
import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import { Message } from '@/lib/types/message';
import { MySocket } from '@/lib/types/socket';
import { useUserStore } from '@/lib/store/userStore';
import apiClient from '@/lib/apiClient';
import MessageSkeleton from './MessageSkeleton';

export default function MessagesView({socket}: {socket: MySocket}) {
  const { _id: receiverId } = useSelectedUserStore();
  const { _id: userId } = useUserStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const roomId = [userId, receiverId].sort().join('_');

    async function setChatHistory() {
      if(receiverId) {
        setMessagesLoading(true);
        try {
          const {messages} = await apiClient(`/api/messages`, "POST", {data: {receiverId}});
          setMessages(messages);
        } catch (error) {

        } finally {
          setMessagesLoading(false);
        }
      }
    }

    if (socket) {
      socket.emit('joinRoom', roomId);
      setChatHistory();
      socket.on('receiveMessage', (message) => {
        if (message.roomId === roomId) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }

    return () => {
      if (socket) socket.off('receiveMessage');
    };
  }, [socket, receiverId]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
                <div key={message._id}>
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
