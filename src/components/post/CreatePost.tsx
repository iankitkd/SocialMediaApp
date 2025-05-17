"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
// import { Progress } from "../ui/progress";
import { ImageIcon, Link2, Smile, X } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { useUserStore } from "@/lib/store/userStore";

// interface CreatePostProps {
//   user: {
//     name: string;
//     avatar: string;
//     username: string;
//   };
//   onPostSubmit: (content: string, media?: File[]) => Promise<void>;
// }

export default function CreatePost() {
  const {name, avatar} = useUserStore();
  const [content, setContent] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  // const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // const [uploadProgress, setUploadProgress] = useState(0);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files);
  //     setMediaFiles(files);
      
  //     // Create preview URLs
  //     const urls = files.map(file => URL.createObjectURL(file));
  //     setPreviewUrls(urls);
  //   }
  // };

  // const removeMedia = (index: number) => {
  //   const newFiles = [...mediaFiles];
  //   newFiles.splice(index, 1);
  //   setMediaFiles(newFiles);
    
  //   const newUrls = [...previewUrls];
  //   newUrls.splice(index, 1);
  //   setPreviewUrls(newUrls);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && mediaFiles.length === 0) return;
    
    setIsUploading(true);
    // setUploadProgress(0);
    
    // Simulate upload progress
    // const interval = setInterval(() => {
    //   setUploadProgress(prev => {
    //     if (prev >= 90) {
    //       clearInterval(interval);
    //       return prev;
    //     }
    //     return prev + 10;
    //   });
    // }, 300);
    
    // try {
    //   await onPostSubmit(content, mediaFiles);
    //   setContent("");
    //   setMediaFiles([]);
    //   setPreviewUrls([]);
    // } catch (error) {
    //   console.error("Error creating post:", error);
    // } finally {
    //   clearInterval(interval);
    //   setUploadProgress(100);
    //   setTimeout(() => setIsUploading(false), 500);
    // }
  };

  return (
    <Card className="p-1 h-full">

      <form onSubmit={handleSubmit}>
        <CardContent className="flex gap-2 items-start justify-start p-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar || ""} />
            <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
          </Avatar>
      
          <Textarea
            className="min-h-[100px] text-lg border-0 focus-visible:ring-0 resize-none bg-card dark:bg-card"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {/* {previewUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )} */}

        </CardContent>
        
        <CardFooter className="flex justify-between items-center px-1 py-0">
          <div className="flex">
            {/* <input
              type="file"
              ref={fileInputRef}
              onChange={handleMediaChange}
              multiple
              accept="image/*,video/*"
              hidden
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-5 w-5 mr-1" />
              Media
            </Button> */}
            
            {/* <Button type="button" variant="ghost" size="sm">
              <Link2 className="h-5 w-5 mr-1" />
              Link
            </Button>
            
            <Button type="button" variant="ghost" size="sm">
              <Smile className="h-5 w-5 mr-1" />
              Emoji
            </Button> */}
          </div>
          
          <Button
            type="submit"
            className="rounded-full"
            disabled={(!content.trim() && mediaFiles.length === 0) || isUploading}
          >
            {isUploading ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
      
      {/* {isUploading && (
        <div className="px-6 pb-4">
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )} */}
    </Card>
  );
}