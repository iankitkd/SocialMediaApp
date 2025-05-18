"use client";

import { useState } from "react";
import Link from "next/link";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
// import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  // HeartFilled,
  // BookmarkFilled
} from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { getInitials } from "@/utils/getInitials";

interface Post {
  _id: string;
  content: string;
  media?: string[];
  author: {
    name: string;
    avatar?: string;
    username: string;
  };
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostCardProps {
  post: Post;
  // onLike: (postId: string) => Promise<void>;
  // onBookmark: (postId: string) => Promise<void>;
  // onComment: (postId: string, comment: string) => Promise<void>;
  // onShare: (postId: string) => Promise<void>;
  // onDelete?: (postId: string) => Promise<void>;
  isOwner?: boolean;
}

export default function PostCard({ 
  post, 
  // onLike, 
  // onBookmark, 
  // onComment, 
  // onShare, 
  // onDelete,
  isOwner = false 
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [commentInput, setCommentInput] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);


  const onLike = async (postId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const onBookmark = async (postId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const onComment = async (postId: string, comment: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const onShare = async (postId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const onDelete = async (postId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleLike = async () => {
    setIsProcessing(true);
    try {
      await onLike(post._id);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBookmark = async () => {
    setIsProcessing(true);
    try {
      await onBookmark(post._id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error bookmarking post:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    setIsProcessing(true);
    try {
      await onComment(post._id, commentInput);
      setCommentInput("");
      setShowCommentInput(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    setIsProcessing(true);
    try {
      await onShare(post._id);
    } catch (error) {
      console.error("Error sharing post:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsProcessing(true);
    try {
      await onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="m-0 py-1 shadow-none bg-background dark:bg-background hover:bg-secondary/30 dark:hover:bg-secondary/30 rounded-none">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/profile/${post.author.username}`} className="font-medium hover:underline">
                {post.author.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                @{post.author.username} · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwner && (
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={handleDelete}
                  disabled={isProcessing}
                >
                  Delete Post
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="whitespace-pre-line">{post.content}</p>
        
        {post.media && post.media.length > 0 && (
          <div className={`mt-3 grid gap-2 ${
            post.media.length === 1 ? "grid-cols-1" : 
            post.media.length === 2 ? "grid-cols-2" : 
            "grid-cols-2"
          }`}>
            {post.media.map((media, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={media}
                  alt={`Post media ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
       <CardFooter className="flex flex-col items-start pt-0">
        <div className="flex justify-between w-full mb-2">
          {/* <Tooltip> */}
            {/* <TooltipTrigger asChild> */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                disabled={isProcessing}
                className="flex items-center space-x-1"
              >
                {isLiked ? (
                  <Heart className="h-5 w-5 text-red-500" fill="currentcolor" />
                ) : (
                  <Heart className="h-5 w-5" />
                )}
                <span>{likeCount}</span>
              </Button>
            {/* </TooltipTrigger> */}
            {/* <TooltipContent> */}
              {/* {isLiked ? "Unlike" : "Like"} */}
            {/* </TooltipContent> */}
          {/* </Tooltip> */}
          
          {/* <Tooltip> */}
            {/* <TooltipTrigger asChild> */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCommentInput(!showCommentInput)}
                disabled={isProcessing}
                className="flex items-center space-x-1"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments}</span>
              </Button>
            {/* </TooltipTrigger> */}
            {/* <TooltipContent> */}
              {/* Comment */}
            {/* </TooltipContent> */}
          {/* </Tooltip> */}
          
          {/* <Tooltip> */}
            {/* <TooltipTrigger asChild> */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                disabled={isProcessing}
                className="flex items-center space-x-1"
              >
                <Share2 className="h-5 w-5" />
                <span>{post.shares}</span>
              </Button>
            {/* </TooltipTrigger> */}
            {/* <TooltipContent> */}
              {/* Share */}
            {/* </TooltipContent> */}
          {/* </Tooltip> */}
          
          {/* <Tooltip> */}
            {/* <TooltipTrigger asChild> */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBookmark}
                disabled={isProcessing}
                className="flex items-center space-x-1"
              >
                {isBookmarked ? (
                  <Bookmark className="h-5 w-5 text-yellow-500" fill="currentcolor" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
            {/* </TooltipTrigger> */}
            {/* <TooltipContent> */}
              {/* {isBookmarked ? "Remove bookmark" : "Bookmark"} */}
            {/* </TooltipContent> */}
          {/* </Tooltip> */}
        </div>
        
        {showCommentInput && (
          <form onSubmit={handleCommentSubmit} className="w-full mt-2 flex space-x-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={!commentInput.trim() || isProcessing}
            >
              Post
            </Button>
          </form>
        )}
      </CardFooter>
     
    </Card>
  );
}