import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getInitials } from "@/utils/getInitials";
import { formatPostDate } from "@/utils/formatPostDate";
import { User } from "@/lib/types/user";
import { Message } from "@/lib/types/message";

interface UserTileProps {
  user: User;
  lastMessage: Message;
  unreadCount: number;
}

export default function ChatListTile({ user, lastMessage, unreadCount }: UserTileProps) {
  return (
      <div className={`flex flex-row items-start gap-2 p-2 border-b rounded-md hover:bg-accent/30 shadow-sm 
          ${unreadCount > 0 && "bg-accent/20 font-medium scale-[1.02]"}`}
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col items-start w-full pr-2">
          <div className="flex justify-between items-center w-full">
            <h3 className={`leading-none text-lg hover:underline ${unreadCount > 0 ? "font-semibold": "font-medium"}`}>{user.name}</h3>
            {unreadCount > 0 && <span className="border rounded-2xl px-2 bg-accent text-accent-foreground text-sm">{unreadCount}</span>}
          </div>
          <div className="flex gap-2 justify-between items-center w-full">
            <p className="text-left text-muted-foreground line-clamp-1">{lastMessage.content}</p>
            <span className="text-right text-muted-foreground text-sm">{formatPostDate(lastMessage.createdAt)}</span>
          </div>
        </div>
      </div>
  );
}
