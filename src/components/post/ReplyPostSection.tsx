"use client"

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import CreatePost from "./CreatePost";
import { getInitials } from "@/utils/getInitials";
import { useUserStore } from "@/store/userStore"

export default function ReplyPostSection({postId, reply}: {postId: string, reply: boolean}) {
    const [isReplying, setIsReplying] = useState(reply);
    
    if(isReplying) {
        return <CreatePost focus={true} mode="reply" postId={postId} />
    }

    return <ReplyPostTab isReplying={isReplying} setIsReplying={setIsReplying} />
}

function ReplyPostTab({isReplying, setIsReplying}: {isReplying: boolean, setIsReplying: React.Dispatch<React.SetStateAction<boolean>>}) {
    const {name, avatar} = useUserStore();
    
  return (
    <div className="w-full flex gap-2 items-center justify-between p-2 border-b"
        onClick={() => setIsReplying(!isReplying)}
    >
        <Avatar className="h-10 w-10">
            <AvatarImage src={avatar || ""} />
            <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
        </Avatar>
      
        <div className="flex-1 text-muted-foreground">
            Post your reply
        </div>

        <Button
            variant={"default"}
            className="rounded-full px-4"
            disabled={true}
        >
            Reply
        </Button>
    </div>
  )
}
