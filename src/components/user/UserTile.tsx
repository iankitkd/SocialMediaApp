import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getInitials } from "@/utils/getInitials";
import { User } from "@/lib/types/user";

interface UserTileProps {
  user: User;
}

export function UserTile({ user }: UserTileProps) {
  return (
      <div className="flex flex-row items-start gap-2 p-2 border-b rounded-md hover:bg-accent/20 shadow-sm">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="leading-none text-lg font-medium hover:underline">{user.name}</h3>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>
  );
}
