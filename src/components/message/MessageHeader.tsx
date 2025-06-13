import { useRouter } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import { useUserStore } from '@/lib/store/userStore';
import { ArrowLeft, MessageSquare, MessageSquareDashed } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react';

interface MessageHeaderProps {
  onClose: () => void;
  isTemporaryMessage: boolean;
  setIsTemporaryMessage: Dispatch<SetStateAction<boolean>>;
}

export default function MessageHeader({onClose, isTemporaryMessage, setIsTemporaryMessage}: MessageHeaderProps) {
  const { username, name } = useSelectedUserStore();
  const {username: currentUsername} = useUserStore();
  const router = useRouter();

  return (
    <div className='flex items-center gap-4 border-b'>
      <button className='px-3 py-1 text-xl h-full hover:cursor-pointer hover:-translate-x-1 transform transition duration-300 ' 
        onClick={onClose}
      >
        <ArrowLeft />
      </button>

      <div className="flex flex-col w-full px-2 py-1 rounded-sm hover:bg-secondary/50" onClick={() => router.push(`/${username}`)}>
        <h3 className="text-xl leading-5 font-medium">{name}</h3>
        <p className="text-sm text-text-muted">{username === currentUsername ? `(Message Yourself)` : `@${username}`}</p>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className='px-4 hover:cursor-pointer'
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
