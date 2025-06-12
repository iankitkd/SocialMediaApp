import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getInitials } from "@/utils/getInitials";
import { formatPostDate } from "@/utils/formatPostDate";
import { User } from "@/lib/types/user";
import { Message } from "@/lib/types/message";

interface UserTileProps {
  user: User;
  lastMessage: Message;
}

export function ChatListTile({ user, lastMessage }: UserTileProps) {
  return (
      <div className="flex flex-row items-start gap-2 p-2 border-b rounded-md hover:bg-accent/20 shadow-sm">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col items-start w-full pr-2">
          <h3 className="leading-none text-lg font-medium hover:underline">{user.name}</h3>
          <div className="flex gap-2 justify-between items-center w-full">
            <p className="text-left text-muted-foreground line-clamp-1">{lastMessage.content}</p>
            <span className="text-right text-muted-foreground text-sm">{formatPostDate(lastMessage.createdAt)}</span>
          </div>
        </div>
      </div>
  );
}
