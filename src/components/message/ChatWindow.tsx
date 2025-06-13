"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const clearUser = useSelectedUserStore.getState().clearUser;

  const socket = useSocket();
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  
  const closeChatWindow = () => {
    clearUser();
    router.refresh();
  }
  
  // to go back to chatlist on exit
  useEffect(() => {
    window.history.pushState({ chatOpen: true }, '');

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.chatOpen) {
        closeChatWindow();
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [closeChatWindow]);



  return (
    <div className="w-full h-full flex">
      {
        (!receiverId || isDesktop) && (
          <ChatList conversations={conversations} />
        )
      }
      
      {
        receiverId ? (
          <div className={`flex flex-col w-screen lg:w-[550px] fixed lg:relative inset-0 h-dvh z-40 bg-background border-r`}>
            <MessageHeader onClose={closeChatWindow}/>
            <MessagesView socket={socket}/>
            <MessageInput socket={socket} />
          </div>
        ) : isDesktop && (
          <div className='w-screen lg:w-[550px] border-r hidden lg:flex flex-col justify-center items-center'>
            <p className="text-text-secondary">Select a chat to start messaging</p>
          </div>
        )
      }
    </div>
  )
}