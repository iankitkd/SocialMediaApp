import { useEffect, useRef, useState } from 'react'

import MessageContent from './MessageContent';
import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import { Message } from '@/lib/types/message';
import { MySocket } from '@/lib/types/socket';
import { useUserStore } from '@/lib/store/userStore';
import apiClient from '@/lib/apiClient';

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
        try {
          const {messages} = await apiClient(`/api/messages`, "POST", {data: {receiverId}});
          setMessages(messages);
        } catch (error) {

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className='flex-1 flex-col py-2 px-4 overflow-y-auto'>
      {
        messages.length > 0 && messages.map((message, i) => {
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
