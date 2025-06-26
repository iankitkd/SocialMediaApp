"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Heart, MessageCircle, Share2, Ellipsis, Link2, Share } from "lucide-react";
import { toast } from "sonner";

import { formatPostDate } from "@/utils/formatPostDate";
import { getInitials } from "@/utils/getInitials";
import { handleCopyLink, handleShare } from "@/utils/navigatorShare";
import { Post } from "@/types/post";

import { likePost, unlikePost } from "@/actions/like";
import { useUserStore } from "@/store/userStore";

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) =>  Promise<void>;
  haveBottomLine?: boolean;
  haveTopLine?: boolean;
}

export default function PostCard({ 
  post,
  onDelete,
  haveBottomLine = false,
  haveTopLine = false,
}: PostCardProps) {
  
  const postUrl = `${post.author.username}/status/${post._id}`
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const {username: currentUsername} = useUserStore();

  const handleLike = async () => {
    if(!currentUsername) {
      return toast.error("Sign in to continue.")
    }

    setIsProcessing(true);
    try {
      if(isLiked) {
        await unlikePost(post._id);
      } else {
        await likePost(post._id);
      }
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      toast.error("Error liking post");
      console.error("Error liking post:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReply = () => {
    if(!currentUsername) {
      return toast.error("Sign in to continue.")
    }
    router.push(`/${postUrl}?reply=true`);
  }

  const handleDelete = async () => {
    if (!post.isOwner || !onDelete) return;
    
    setIsProcessing(true);
    try {
      await onDelete(post._id);
      toast.success("Post deleted")
    } catch (error) {
      toast.error("Error deleting post");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={`m-0 p-1 flex flex-row gap-1 shadow-none bg-background dark:bg-background hover:bg-secondary/30 dark:hover:bg-secondary/30 rounded-none
      ${haveBottomLine && "border-b-0"} ${haveTopLine && "border-t-0"} `}
    >
      <div className="w-14 flex flex-col items-center">
        {haveTopLine && <div className="w-[2px] h-2 -translate-y-1 bg-foreground/40 rounded-b-md"></div>}

        <Link href={`/${post.author.username}`}>
          <Avatar className="h-10 w-10 ">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
          </Avatar>
        </Link>

        {haveBottomLine && <div className="w-[2px] h-full translate-y-1 bg-foreground/40 rounded-t-md"></div>}
      </div>
      
     <div className="flex-1 flex flex-col">
      <CardHeader className="py-0 px-0 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Link href={`/${post.author.username}`} className="font-medium text-foreground/90 hover:underline">
            {post.author.name}
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1">
            @{post.author.username} · {formatPostDate(new Date(post.createdAt))}
          </p>
        </div>
          
        {post.isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0" asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={handleDelete}
                disabled={isProcessing}
              >
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      
      <CardContent className="pb-3 px-0 -translate-y-[6px]">
        <p className="whitespace-pre-line text-foreground"
            onClick={() => router.push(`/${postUrl}`)}
        >
          {post.content}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between w-full max-w-sm text-muted-foreground pt-0 pb-1 pl-0 pr-2">
        {/* Like button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          disabled={isProcessing}
          className="flex items-center gap-1 hover:text-red-500 dark:hover:text-red-500"
        >
          {isLiked ? (
            <Heart className="h-5 w-5 text-red-500" fill="currentcolor" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
          <span>{likeCount}</span>
        </Button>

        {/* Comment button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReply}
          disabled={isProcessing}
          className="flex items-center gap-1 hover:text-green-500 dark:hover:text-green-500"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.commentsCount}</span>
        </Button>

        {/* Share button */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-0" asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-500"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleCopyLink(postUrl)}>
              <Link2 /> Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare(postUrl)}>
              <Share /> Share Post Via ...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </CardFooter>
     </div>
    </Card>
  );
}