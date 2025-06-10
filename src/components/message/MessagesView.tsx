import { useEffect, useRef, useState } from 'react'

import MessageContent from './MessageContent';
import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import { Message } from '@/lib/types/message';

export default function MessagesView() {
  const { _id } = useSelectedUserStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className='flex-1 flex-col'>
      {
        messages.length > 0 && messages.map((message) => {
          return (
            <MessageContent 
              key={message._id} 
              message={message} 
              isOwnMessage={message.senderId !== _id}
            />
          )
        })
      }
      <div ref={messagesEndRef} />
    </div>
  )
}
