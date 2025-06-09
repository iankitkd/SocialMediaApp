"use client"

import { useEffect } from 'react';

import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import MessageHeader from './MessageHeader';
import MessagesView from './MessagesView';
import MessageInput from './MessageInput';


export default function ChatWindow() {
  const { userId } = useSelectedUserStore();
  const clearUser = useSelectedUserStore.getState().clearUser;

  
  const closeChatWindow = () => {
    clearUser();
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


  // If no chat selected return 
  if(!userId) {
    return (
      <div className='w-screen md:w-[550px] border-r flex flex-col justify-center items-center'>
        <p className="text-text-secondary">Select a chat to start messaging</p>
        {/* new message button */}
      </div>
    )
  }


  return (
    <div className='flex flex-col w-screen md:w-[550px] border-r'>
      <MessageHeader onClose={closeChatWindow}/>
      <MessagesView />
      <MessageInput />
    </div>
  )
}
