"use client"

import { useEffect, useState } from 'react';

import ChatList from './ChatList';
import MessageHeader from './MessageHeader';
import MessagesView from './MessagesView';
import MessageInput from './MessageInput';

import { useSocket } from '@/hooks/useSocket';
import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Conversation } from '@/lib/types/message';


export default function ChatWindow({conversations}: {conversations: Conversation[]}) {
  const { _id: receiverId } = useSelectedUserStore();

  const socket = useSocket();
  const [isTemporaryMessage, setIsTemporaryMessage] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [viewportHeight, setViewportHeight] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 0);

  useEffect(() => {
    const onResize = () => {
      const viewport = window.visualViewport;
      if (viewport) {
        setViewportHeight(viewport.height);
      }
    };

    onResize(); // set initial height
    window.visualViewport?.addEventListener("resize", onResize);
    return () => window.visualViewport?.removeEventListener("resize", onResize);
  }, []);


  return (
    <div className="flex">
      {
        (!receiverId || isDesktop) && (
          <ChatList conversations={conversations} />
        )
      }
      
      {
        receiverId ? (
          <div className='lg:relative fixed top-0 left-0 h-dvh w-screen lg:w-[550px] z-40 bg-background border-r'>
            <div className={`flex flex-col transition-all duration-300`}  
                style={{ height: `${viewportHeight}px` }}
            >
              <MessageHeader socket={socket} isTemporaryMessage={isTemporaryMessage} setIsTemporaryMessage={setIsTemporaryMessage}/>
              <MessagesView socket={socket} isTemporaryMessage={isTemporaryMessage}/>
              <MessageInput socket={socket} isTemporaryMessage={isTemporaryMessage} />
            </div>
          </div>
        ) : isDesktop && (
          <div className='w-screen lg:w-[550px] h-screen border-r hidden lg:flex flex-col justify-center items-center'>
            <p className="text-text-secondary">Select a chat to start messaging</p>
          </div>
        )
      }
    </div>
  )
}