import { Message } from '@/types/message';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export default function MessageContent({ message, isOwnMessage } : ChatMessageProps) {
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
    });
  };

  if (message?.type === 'system') {
    return (
      <div className="flex justify-center my-2">
        <span className="text-gray-500 text-sm italic">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}>
      <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg flex flex-col ${
        isOwnMessage 
          ? 'bg-blue-500 text-white rounded-tr-none' 
          : 'bg-gray-200 text-gray-800 rounded-tl-none'
        }`}
      >

        <div className="text-sm break-words whitespace-pre-wrap">{message.content}</div>
        <div className={`text-xs leading-0 pt-3 pb-1 self-end ${
          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {formatTime(message.createdAt)}
        </div>

      </div>
    </div>
  );
}
