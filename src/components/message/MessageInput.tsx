import { useEffect, useRef, useState } from 'react'

import { Send } from 'lucide-react'
import { useUserStore } from '@/store/userStore';
import { useSelectedUserStore } from '@/store/selectedUserStore';
import { MySocket } from '@/types/socket';

export default function MessageInput({socket, isTemporaryMessage}: {socket: MySocket, isTemporaryMessage: boolean}) {
    const [newMessage, setNewMessage] = useState("");
    const [sendMessageLoading, setSendMessageLoading] = useState(false);

    const { _id: receiverId } = useSelectedUserStore();
    const { _id: senderId } = useUserStore();

    const roomId = [senderId, receiverId].sort().join('_');
    const concatStr = isTemporaryMessage ? "_temp" : "";
    const currentRoomId = `${roomId}${concatStr}`;

    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    useEffect(() => {
      // Clean up on unmount
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }, [socket]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewMessage(e.target.value);
      adjustHeight();

      socket?.emit("typing", { roomId:currentRoomId, userId:senderId });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket?.emit("stopTyping", { roomId:currentRoomId, userId:senderId });
      }, 2000);
    }


    const handleSendMessage = () => {
      if(!newMessage.trim() || !socket) return;

      setSendMessageLoading(true);
      try {
        socket.emit('sendMessage', { content: newMessage.trim(), receiverId, senderId, isTemporaryMessage });
        setNewMessage("");
      } catch (error) {

      } finally {
        setSendMessageLoading(false);
      }
    }


  return (
    <div className='p-2 border-t'>
      <div className='flex rounded-lg px-2 bg-secondary text-bg-foreground'>
        <textarea 
            ref={textareaRef}
            id='message'
            placeholder='Type a message'
            value={newMessage}
            disabled={sendMessageLoading}
            onChange={handleInputChange}
            rows={1}
            className='w-full min-h-[40px] max-h-[75px] outline-0 resize-none overflow-y-auto px-3 py-2'
        />

        {(sendMessageLoading || newMessage) && (
          <button className='text-2xl px-3 hover:cursor-pointer hover:scale-110 hover:translate-x-0.5 hover:-translate-y-0.5 transform transition duration-300' 
            onClick={handleSendMessage} 
            disabled={sendMessageLoading}
          >
            <Send />
          </button>
        )}
      </div>
    </div>
  )
}
