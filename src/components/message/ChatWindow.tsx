import { useEffect } from 'react';

import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import MessageHeader from './MessageHeader';
import MessagesView from './MessagesView';
import MessageInput from './MessageInput';
import { MySocket } from '@/lib/types/socket';


export default function ChatWindow({socket} : {socket: MySocket}) {
  const { _id } = useSelectedUserStore();
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
  if(!_id) {
    return (
      <div className='w-screen lg:w-[550px] border-r hidden lg:flex flex-col justify-center items-center'>
        <p className="text-text-secondary">Select a chat to start messaging</p>
      </div>
    )
  }


  return (
    <div className={`flex flex-col w-screen lg:w-[550px] fixed lg:relative inset-0 h-dvh z-40 bg-background border-r`}>
      <MessageHeader onClose={closeChatWindow}/>
      <MessagesView socket={socket}/>
      <MessageInput socket={socket} />
    </div>
  )
}
