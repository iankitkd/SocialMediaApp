import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, MessageSquare, MessageSquareDashed } from 'lucide-react'

import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import { useModalBackButton } from '@/hooks/useModalBackButton';
import { useUserStore } from '@/lib/store/userStore';
import { MySocket } from '@/lib/types/socket';

interface MessageHeaderProps {
  socket: MySocket;
  isTemporaryMessage: boolean;
  setIsTemporaryMessage: Dispatch<SetStateAction<boolean>>;
}

export default function MessageHeader({socket, isTemporaryMessage, setIsTemporaryMessage}: MessageHeaderProps) {
  const { _id:receiverId, username, name } = useSelectedUserStore();
  const clearSelectedUser = useSelectedUserStore.getState().clearUser;
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const {username: currentUsername} = useUserStore();
  const router = useRouter();

  const closeChatWindow = () => {
    clearSelectedUser();
    setIsTemporaryMessage(false);
    router.refresh();
  }

  // to handle back button behavior for chat area
  useModalBackButton(!!receiverId, closeChatWindow);


  useEffect(()=> {
    if(socket) {
      // check typing status
      socket.on("typing", ({ userId }) => {
        if(userId === receiverId) setIsTyping(true);
      });
      
      socket.on("stopTyping", ({ userId }) => {
        if(userId === receiverId) setIsTyping(false);
      });

      // check online status
      socket.on("userOnline", ({ userId }) => {
        if (userId === receiverId) setIsOnline(true);
      });

      socket.on("userOffline", ({ userId }) => {
        if (userId === receiverId) setIsOnline(false);
      });

      // check on mounting
      socket.emit("checkUserStatus", { userId: receiverId });
      socket.on("userStatus", ({ userId, online }) => {
        if (userId === receiverId) setIsOnline(online);
      });

      return () => {
        if(socket) {
          socket.off("typing");
          socket.off("stopTyping");
          socket.off("userOnline");
          socket.off("userOffline");
          socket.off("userStatus");
        }
      };
    }
  }, [receiverId])

  return (
    <div className='flex items-center gap-1 border-b h-13 w-full relative'>
      <button className='px-3 py-1 text-xl h-full hover:cursor-pointer hover:-translate-x-1 transform transition duration-300 ' 
        onClick={closeChatWindow}
      >
        <ArrowLeft />
      </button>

      <div className="flex flex-col w-[75%] px-2 py-1 rounded-sm hover:bg-secondary/50" onClick={() => router.push(`/${username}`)}>
        <div className='flex gap-2 items-baseline'>
          <h3 className="text-xl leading-5 font-medium max-w-4/5 truncate">{name}</h3>
          <p className="text-sm text-muted-foreground truncate">{username === currentUsername ? `(Message Yourself)` : `@${username}`}</p>
        </div>

        <p className={`text-left text-sm flex items-center gap-1 leading-3 py-0 ${isTyping ? "text-primary": "text-green-500"}`}>
          {
            isTyping ? (
              <span>Typing...</span>
            ) : isOnline && (
              <>
                <span className='font-bold text-xl leading-0'>&#183;</span> 
                <span>Online</span>
              </>
            )
          }
        </p>
       </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className='px-4 hover:cursor-pointer absolute right-0 lg:right-6'
            onClick={() => setIsTemporaryMessage((prev) => !prev)}
          >
            {
              isTemporaryMessage ? (
                <MessageSquare />
              ): (
                <MessageSquareDashed />
              )
            }
          </button>
        </TooltipTrigger>
        <TooltipContent className='bg-secondary text-foreground text-base'>
          <p>{isTemporaryMessage? "Start Normal chat" : "Start Temporary chat"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
