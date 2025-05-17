"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { X } from "lucide-react";
import { toast } from "sonner";

import { getInitials } from "@/utils/getInitials";
import { useUserStore } from "@/lib/store/userStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CreatePost({forHomePage} : {forHomePage: boolean}) {
  const {name, avatar} = useUserStore();

  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);   

  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if(!isDesktop && forHomePage) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || content.length > 280) return;
    
    setIsUploading(true);  
    try {
      // await createPost(content);
      setContent("");
      router.push("/home");
    } catch (error:any) {
      console.error("Error creating post:", error);
      toast.error(error.message || "Errro creating post");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-1 w-full h-full max-h-screen bg-background dark:bg-background rounded-none">

      <form onSubmit={handleSubmit}>
        {(!isDesktop || !forHomePage) && <CreatePostHeader content={content} isUploading={isUploading} router={router} />}

        <CardContent className="relative flex gap-2 items-start justify-start py-1 px-2">
          <Avatar className="h-10 w-10 absolute left-2 top-1">
            <AvatarImage src={avatar || ""} />
            <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
          </Avatar>
      
          <div className="w-full pl-12">
            <Textarea
              className="min-h-[100px] max-h-[calc(100vh-100px)] text-lg md:text-xl p-1 border-0 focus-visible:ring-0 resize-none bg-background dark:bg-background overflow-y-scroll"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {
              content.length > 280 && (<p className="text-destructive rounded-lg p-1">Content can't exceed 280 characters.</p>)
            }
          </div>
        </CardContent>
        
        {isDesktop && <CreatePostFooter content={content} isUploading={isUploading} />}
      </form>
    </Card>
  );
}

type CreatePostHeaderProps = {
  content: string;
  isUploading: boolean;
  router: ReturnType<typeof useRouter>;
};

function CreatePostHeader({content, isUploading, router}: CreatePostHeaderProps) {
  return (
    <CardHeader className="flex justify-between items-center px-4 pb-1">
      <Button 
        className="w-10 h-10 px-0 py-0"
        variant={"ghost"}
        onClick={() => router.back()}
      >
        <X className="font-bold text-2xl size-6" />
      </Button>
      <Button
        type="submit"
        className="rounded-full px-6 md:hidden"
        disabled={!content.trim() || (content?.length > 280) || isUploading}
      >
        {isUploading ? "Posting..." : "Post"}
      </Button>
    </CardHeader>
  )
}

type CreatePostFooterProps = {
  content: string;
  isUploading: boolean;
};

function CreatePostFooter({content, isUploading}: CreatePostFooterProps) {
  return (
    <CardFooter className="hidden md:flex justify-end items-center px-1 py-0 border-t [.border-t]:pt-1">
      <Button
        type="submit"
        className="rounded-full px-8"
        disabled={!content.trim() || (content?.length > 280) || isUploading}
      >
        {isUploading ? "Posting..." : "Post"}
      </Button>
    </CardFooter>
  )
}