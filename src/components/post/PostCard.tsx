"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Heart, MessageCircle, Share2, Ellipsis, Link2, Share } from "lucide-react";

import { formatPostDate } from "@/utils/formatPostDate";
import { getInitials } from "@/utils/getInitials";
import { handleCopyLink, handleShare } from "@/utils/navigatorShare";
import { Post } from "@/lib/types/post";
import { deletePost } from "@/lib/actions/post";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  isOwner?: boolean;
}

export default function PostCard({ 
  post,
  isOwner = false 
}: PostCardProps) {
  
  const postUrl = `${post.author.username}/status/${post._id}`
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const handleLike = async () => {
    setIsProcessing(true);
    try {
      // await onLike(post._id);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      toast.error("Error liking post");
      console.error("Error liking post:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!isOwner) return;
    
    setIsProcessing(true);
    try {
      await deletePost(post._id);
      toast.success("Post deleted")
    } catch (error) {
      toast.error("Error deleting post");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="m-0 py-1 pr-2 pl-14 gap-0 relative shadow-none bg-background dark:bg-background hover:bg-secondary/30 dark:hover:bg-secondary/30 rounded-none">
      <Link href={`/${post.author.username}`}>
        <Avatar className="h-10 w-10 absolute top-2 left-2">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
        </Avatar>
      </Link>
      
      <CardHeader className="py-0 px-0 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Link href={`/${post.author.username}`} className="font-medium text-foreground/90 hover:underline">
            {post.author.name}
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1">
            @{post.author.username} · {formatPostDate(new Date(post.createdAt))}
          </p>
        </div>
          
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
      
      <CardContent className="pb-3 px-0 -translate-y-2">
        <p className="whitespace-pre-line text-foreground"
            onClick={() => router.push(postUrl)}
        >
          {post.content}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between w-full text-muted-foreground pt-0 pb-1 px-0">
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
          onClick={() => router.push(postUrl)}
          disabled={isProcessing}
          className="flex items-center gap-1 hover:text-green-500 dark:hover:text-green-500"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments}</span>
        </Button>

        {/* Share button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
     
    </Card>
  );
}