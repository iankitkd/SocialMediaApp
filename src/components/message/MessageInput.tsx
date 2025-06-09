import { useRef, useState } from 'react'

import { Send } from 'lucide-react'

export default function MessageInput() {
    const [newMessage, setNewMessage] = useState("");
    const [sendMessageLoading, setSendMessageLoading] = useState(false);

    const handleSendMessage = () => {
      if(!newMessage.trim()) return;

      setSendMessageLoading(true);
      try {
        
        setNewMessage("");
      } catch (error) {
        
      } finally {
        setSendMessageLoading(true);
      }
    }

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if(textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

  return (
    <div className='p-2 border-t'>
      <div className='flex rounded-lg px-2 bg-secondary text-bg-foreground'>
        <textarea 
            ref={textareaRef}
            id='message'
            placeholder='Type a message'
            value={newMessage}
            disabled={sendMessageLoading}
            onChange={(e) => setNewMessage(e.target.value)}
            onInput={adjustHeight}
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
